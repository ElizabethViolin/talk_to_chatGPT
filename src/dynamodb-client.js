import AWS from './aws-config';

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

export default dynamoDbClient;