## Checking Updated Nameservers (Azure DNS)

### Verify DNS Resolution

```bash
dig davidtausendresume.net
```
Expected output:
status: NOERROR
ANSWER: 0
AUTHORITY: 1
SOA: ns1-08.azure-dns.com

This output means the domain exists and Azure DNS is authoritative, but no A record has been created yet. Seeing an Azure DNS SOA confirms that the nameserver delegation is correct.

## Install Azure Bicep for MacOS

### Login to azure

```sh
az login
```

## Install Ansible

Although Ansible is not strictly required to deploy Azure Bicep templates, it is useful for orchestrating additional tasks such as validation, what-if previews, and uploading website files. Ansible provides a more structured and flexible approach than Bash or PowerShell scripting.

```sh
pipx install --include-deps ansible
```

## Install Deps for Ansible macos

Install the required Ansible collections using the following commands.

```sh
cd azure
ansible-galaxy collection install -r requirements.txt
```

## Resolving Installation Issues with azure.azcollection

During setup, it became clear that azure.azcollection does not automatically install all required Python dependencies. To resolve this, an azure-requirements.txt file was created and the dependencies were installed manually.

The recommended approach is to install the dependencies into a local virtual environment and configure Ansible to use that interpreter.

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r azure-requirements.txt
```

Alternatively, the dependencies can be installed directly into Ansible’s bundled Python interpreter, although this approach is not recommended because it tightly couples the project to a specific Ansible installation.

```sh
/opt/homebrew/Cellar/ansible/13.0.0/libexec/bin/python -m pip install -r azure/azure-requirements.txt
```

If necessary, the Azure Ansible collection can be upgraded using the command below.

```sh
ansible-galaxy collection install azure.azcollection --upgrade
```

## Infrastructure as Code vs Configuration Management for Containers

In AWS, an S3 bucket is clearly managed using Infrastructure as Code. In Azure, a Storage Account also fits naturally into an IaC model. However, it is less clear whether individual blob containers should be managed declaratively.

During testing, Azure Bicep did not remove a previously renamed container, which suggests that containers behave more like data objects than strict infrastructure resources. This behavior indicates that container lifecycle management may be better handled through configuration management tools such as Ansible rather than Bicep.

Based on these observations, Azure Bicep is used to manage Storage Accounts, while Ansible is used to manage blob containers and uploaded objects. This separation helps avoid state drift and aligns container handling more closely with application-level configuration.


## Azure Functions – Required Tools and Providers

Azure Functions require the Azure Functions Core Tools to be installed locally in order to run and test functions.

## Register Required Azure Resource Providers

Before creating or deploying Azure Functions, ensure the required resource providers are registered in your subscription.

```sh
az provider register --namespace Microsoft.ManagedIdentity
az provider register --namespace Microsoft.Web
az provider register --namespace Microsoft.Storage
az provider register --namespace Microsoft.OperationalInsights
az provider register --namespace Microsoft.Insights
```

Check the registration status and wait until each provider reports Registered:

```sh
az provider show --namespace Microsoft.ManagedIdentity --query "registrationState" -o tsv
az provider show --namespace Microsoft.Web --query "registrationState" -o tsv
az provider show --namespace Microsoft.Storage --query "registrationState" -o tsv
az provider show --namespace Microsoft.OperationalInsights --query "registrationState" -o tsv
az provider show --namespace Microsoft.Insights --query "registrationState" -o tsv
```

## Install Azure Functions Core Tools (macOS)

Azure Functions Core Tools are required to run func commands locally.

```sh
brew tap azure/functions
brew install azure-functions-core-tools@4
```

Verify the installation:

```sh
func --version
```

## Local Testing of Python Azure Functions

Activate the virtual environment, install dependencies, and start the local Azure Functions host.

```sh
cd backend-counter
source .venv/bin/activate
pip install -r requirements.txt
func start
```

## Problems and Troubleshooting

### Azure Resource Provider Not Registered

While deploying Azure Functions, deployments may fail with errors such as:

```sh
The subscription is not registered to use namespace 'Microsoft.ManagedIdentity'
The subscription is not registered to use namespace 'Microsoft.Web'
```

These errors indicate that required Azure resource providers are not registered. Register the missing providers using az provider register and wait until the registration state changes to Registered.

### Azure Functions CORS Preflight Failures

If browser requests fail with CORS errors such as:

```sh
Redirect is not allowed for a preflight request
```

This typically indicates that the request is being redirected (for example by a CDN or static website endpoint) before reaching the Azure Function.

To resolve this:
- Ensure the frontend calls the Function App directly, not via the static website origin.
- Confirm that the Function App CORS settings include the exact frontend origin (no trailing slashes).
- Avoid routing /api/* through static storage or CDN rules that return HTML.

### Storage Account Name Mismatch in Validators

Automated validators may require an exact storage account name. Even a single character difference will cause validation to fail.

Azure Storage Accounts cannot be renamed. If the validator expects a specific name, the storage account must be deleted and recreated with the exact expected name.

## Edit Vault

We store our configuration in an Ansible Vault file. This is optional, but we use it for learning purposes and to keep configuration (including non-sensitive values) in one place.

```sh
cd aws
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
ansible-vault view playbooks/vaults/prod.yml
```