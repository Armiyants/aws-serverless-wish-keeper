const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.saveData = async (event) => {
    try {
        const { username, text } = JSON.parse(event.body);
        const item = {
            id: Date.now().toString(), // Generate a unique ID for the item
            username: username,
            wish: text
        };
        const params = {
            TableName: 'dynamoDBTableName',
            Item: item
        };

        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify( `${username} jan, your wish is my command.` )
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `An error occurred while saving data: ${error}` })
        };
    }
};
