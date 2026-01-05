terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 7.0"
    }
  }

  cloud {
    organization = "DavidTausend"
    workspaces {
      name = "gcs-davidtausendresumeorg"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

data "google_project" "this" {}

resource "google_storage_bucket" "static_site" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket  = google_storage_bucket.static_site.name
  role    = "roles/storage.objectViewer"
  members = ["allUsers"]
}

resource "google_project_service" "apis" {
  for_each = toset([
    "cloudfunctions.googleapis.com",
    "run.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com",
    "eventarc.googleapis.com",
    "logging.googleapis.com",
    "storage.googleapis.com",
    "iamcredentials.googleapis.com",
    "firestore.googleapis.com",
  ])

  service            = each.key
  disable_on_destroy = false
}

resource "google_service_account" "fn_runtime" {
  account_id   = "fn-viewcounter-runtime"
  display_name = "Runtime SA for View Counter (Cloud Functions Gen2)"
}

resource "google_service_account" "fn_build" {
  account_id   = "fn-viewcounter-build"
  display_name = "Build SA for View Counter (Cloud Build / Functions Gen2)"
}

resource "google_project_iam_member" "fn_build_roles" {
  for_each = toset([
    "roles/cloudbuild.builds.editor",
    "roles/storage.objectViewer",
    "roles/storage.objectAdmin",
    "roles/artifactregistry.writer",
    "roles/logging.logWriter",
    "roles/run.admin",
    "roles/iam.serviceAccountUser",
  ])

  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.fn_build.email}"
}

resource "google_cloudfunctions2_function" "fn" {
  name        = var.function_name
  location    = var.region
  description = "CRC View Counter"

  depends_on = [
    google_project_service.apis,
    google_project_iam_member.fn_build_roles,
  ]

  build_config {
    runtime     = "python311"
    entry_point = "hello_http"

    service_account = "projects/${var.project_id}/serviceAccounts/${google_service_account.fn_build.email}"

    source {
      storage_source {
        bucket = var.function_bucket_name
        object = var.function_object_name
      }
    }
  }

  service_config {
    service_account_email            = google_service_account.fn_runtime.email
    available_memory                 = "256M"
    timeout_seconds                  = 30
    ingress_settings                 = "ALLOW_ALL"
    max_instance_request_concurrency = 1

    environment_variables = {
      COLLECTION_NAME      = "counter"
      COUNTER_PK           = "global"
      CORS_ALLOWED_ORIGINS = "*"
      CORS_ALLOW_METHODS   = "GET,POST,OPTIONS"
      CORS_ALLOW_HEADERS   = "Content-Type,Authorization"
      CORS_MAX_AGE         = "3600"
    }
  }
}

resource "google_cloud_run_service_iam_member" "public_invoker" {
  location = var.region
  project  = var.project_id
  service  = google_cloudfunctions2_function.fn.service_config[0].service

  role   = "roles/run.invoker"
  member = "allUsers"
}

resource "google_firestore_database" "default" {
  project     = var.project_id
  name        = "(default)"
  location_id = "nam5"
  type        = "FIRESTORE_NATIVE"

  depends_on = [google_project_service.apis]
}

resource "google_project_iam_member" "fn_firestore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.fn_runtime.email}"
}

resource "google_firestore_document" "counter_seed" {
  project     = var.project_id
  database    = "(default)"
  collection  = "counter"
  document_id = "global"

  fields = jsonencode({
    count = { integerValue = 0 }
  })
}

output "function_url" {
  value = google_cloudfunctions2_function.fn.url
}

output "curl_function" {
  value = "curl '${google_cloudfunctions2_function.fn.url}?name=David'"
}
