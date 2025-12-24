provider "google" {
  project = "cloud-resume-challenge-481614"
  region  = "europe-west3"
}

resource "google_storage_bucket" "static-site" {
  name          = var.bucket_name
  location      = "europe-west3"
  force_destroy = true

  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}