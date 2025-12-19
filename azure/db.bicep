@description('Name of the Cosmos DB account')
param cosmosdb_account_name string

@description('Azure region for the Cosmos DB account')
param location string = resourceGroup().location

@description('Name of the database')
param databaseName string = 'viewCounterDb'

@description('Name of the container')
param containerName string = 'counter'

resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-03-15' = {
  name: cosmosdb_account_name
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: location
        failoverPriority: 0
      }
    ]
    enableFreeTier: true
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
  }
}

resource cosmosDb 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-03-15' = {
  parent: cosmosAccount
  name: '${databaseName}'
  properties: {
    resource: {
      id: databaseName
    }
    options: {
      throughput: 400
    }
  }
}

resource cosmosContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-03-15' = {
  parent: cosmosDb
  name: '${containerName}'
  properties: {
    resource: {
      id: containerName
      partitionKey: {
        paths: ['/id']
        kind: 'Hash'
      }
      indexingPolicy: {
        indexingMode: 'Consistent'
      }
      defaultTtl: -1
    }
    options: {
    }
  }
}
