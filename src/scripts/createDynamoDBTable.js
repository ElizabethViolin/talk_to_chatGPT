const AWS = require('aws-sdk');

// Configure AWS to use your region
AWS.config.update({ region: 'us-east-1' }); // Replace 'us-west-2' with your actual region

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const createUserProfilesTable = () => {
  const userProfilesParams = {
    TableName: 'UserProfiles',
    KeySchema: [{ AttributeName: 'UserID', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'UserID', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
  };

  ddb.createTable(userProfilesParams, (err, data) => {
    if (err) {
      console.error('Error creating UserProfiles table:', err);
    } else {
      console.log('UserProfiles table created:', data);
    }
  });
};

const createNotesTable = () => {
  const notesParams = {
    TableName: 'Notes',
    KeySchema: [{ AttributeName: 'NoteID', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'NoteID', AttributeType: 'S' },
      { AttributeName: 'OwnerUserID', AttributeType: 'S' }
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'OwnerUserIDIndex',
        KeySchema: [{ AttributeName: 'OwnerUserID', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 }
      }
    ]
  };

  ddb.createTable(notesParams, (err, data) => {
    if (err) {
      console.error('Error creating Notes table:', err);
    } else {
      console.log('Notes table created:', data);
    }
  });
};

// Call the functions to create the tables
createUserProfilesTable();
createNotesTable();