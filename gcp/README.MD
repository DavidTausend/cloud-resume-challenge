## Install Terraform

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

Verify installation:

```sh
terraform version
```

### Terraform & GCP Authentication

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