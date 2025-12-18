@description('Azure region for the storage account.')
param location string

@description('Storage account name (3–24 characters, lowercase letters and digits only).')
param storage_account_name string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storage_account_name
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: true
  }
}

@description('Primary web endpoint (available after static website is enabled)')
output primaryWebEndpoint string = storageAccount.properties.primaryEndpoints.web

@description('Storage account name')
output storageAccountName string = storageAccount.name
