## Install Terraform

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

Verify installation:

```sh
terraform version
```

### Terraform & GCP Authentication (ADC)

Terraform does not require service account JSON keys when using Application Default Credentials (ADC).

If you run Ansible/Terraform from your Mac, authenticate once:

```sh
gcloud auth application-default login
```
This opens a browser and stores short-lived credentials securely.

What to store in Ansible Vault instead

Only non-secret configuration:
	•	gcp_project_id
	•	gcp_region
	•	resource names (bucket name, domain, etc.)

## Setup Vault with GCP 

Create and manage your encrypted variables file:

```sh
cd gcp
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```

## Install Deps for Ansible

```sh
ansible-galaxy collection install -r requirements.txt
``` 

Verify:

```sh
ansible-galaxy collection list
``` 

## Install Google Cloud SDK (macOS)

```sh
brew install --cask google-cloud-sdk
``` 

Initialize gcloud:

```sh
gcloud init
``` 

Verify installation:

```sh
gcloud version
``` 

## Verify Authentication

Confirm both gcloud and ADC are working:

```sh
gcloud auth list
gcloud auth application-default print-access-token
``` 

If the second command prints a token, so the authentication is correct.

## Terraform Cloud Setup

### Terraform Cloud Token

Terraform Cloud requires an API token.

Create one at: Terraform Cloud → User Settings → Tokens

Export it locally:

```sh
export TF_TOKEN_app_terraform_io=xxxxxxxxxxxxxxxx
```

Terraform automatically picks this up during terraform init/apply.

## Terraform Workspaces

This project uses a single fixed workspace, defined in main.tf:

```sh
terraform {
  cloud {
    organization = "DavidTausend"
    workspaces {
      name = "gcs-davidtausendresumeorg"
    }
  }
}
```

Important ⚠️
	•	Never set TF_WORKSPACE manually
	•	Ansible explicitly unsets it to avoid Terraform Cloud conflicts
	•	If TF_WORKSPACE is set, Terraform will fail with confusing errors

This is why the Ansible task runs Terraform as:

```sh
env -u TF_WORKSPACE terraform apply ...
```

## Packaging the Cloud Function

Before deploying, the function must be packaged and uploaded to GCS.

Typical flow:
```sh
cd function
zip -r function.zip main.py requirements.txt
gsutil cp function.zip gs://crc-func-tausend/
```
The object name must match:
```sh
function_object_name = "function.zip"
```

## Testing the function Locally

Test our function before we package it.

```sh
bundle exec functions-framework --target hello_http --port 8080
```