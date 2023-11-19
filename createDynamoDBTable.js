// scripts/createDynamoDBTable.js
const AWS = require('aws-sdk');

// Configure AWS to use your region
AWS.config.update({ region: 'us-east-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const tableParams = {
  TableName: 'Users',
  KeySchema: [
    { AttributeName: 'UserId', KeyType: 'HASH' },  // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'UserId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

// Create the DynamoDB table
ddb.createTable(tableParams, (err, data) => {
  if (err && err.code === 'ResourceInUseException') {
    console.log('Table already exists');
  } else if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
