## Using CloudFormation

For this project we could use several IaC tools:
- CloudFormation
- CDK
- Terraform

For the first version of the Cloud Resume Challenge we use CloudFormation because it is:

- available out-of-the-box in every AWS account,
- declarative and easy to review,
- simple enough for a single S3 + CloudFront stack.

## Installing Ansible on macOS

Install Ansible and the AWS collection:
```sh
brew install ansible
brew install --include-deps ansible
ansible-galaxy collection install amazon.aws
```

## Managing Secrets with Ansible Vault

We store our AWS credentials and deployment configuration in an Ansible Vault file.
This is mainly for learning purposes even non-sensitive values go into the vault so we
can practice a Git-friendly workflow.


```sh
cd aws
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
```
Typical values you might store in prod.yml:

STACK_NAME: cloud-resume-challenge-bucket
AWS_REGION: eu-central-1
AWS_ACCESS_KEY_ID: YOUR_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY: YOUR_SECRET_ACCESS_KEY

Note: Even though this file is encrypted, you should still treat it like a secret
and make sure playbooks/vaults/* is not world-readable outside your repo.

## IAM: Create a Deployment User

To deploy the CloudFormation stack from your local machine or CI pipeline, create a
dedicated IAM user just for deployments.

High-level steps in the AWS console:
	1.	Go to IAM → Users → Add users.
	2.	Give the user a name, e.g. cloud-resume-deployer.
	3.	Select Access key – Programmatic access.
	4.	Attach a policy with the minimum permissions, for example:
	    •	AmazonS3FullAccess (or a custom S3 policy for your bucket),
	    •	CloudFormationFullAccess (or a restricted stack-specific policy).
	5.	Create the user and download the access key ID and secret access key.

Store these credentials in the Ansible vault (prod.yml) so they are not committed in
plain text.

## Create Access Keys for the User

When you create the IAM user, AWS gives you:
	•	Access key ID
	•	Secret access key

You only see the secret key once. Immediately:
	1.	Add both values to playbooks/vaults/prod.yml:

```sh
aws_access_key_id: YOUR_ACCESS_KEY_ID
aws_secret_access_key: YOUR_SECRET_ACCESS_KEY
```

## Install Deps for Ansible

```sh
ansible-galaxy collection install -r requirements.txt
```

## Install cfn-lint

```sh
pipx install cfn-lint
```

## Install SAM CLI and AWS CLI

We need to install both AWS SAM CLI and AWS CLI

AWS SAM CLI expects to use a profile so even if you set the
AWS env vars it will ignore it.
