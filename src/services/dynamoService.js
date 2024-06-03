import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'releases-db';

export const fetchReleases = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    // Sort the data by releaseId
    const sortedData = data.Items.sort((a, b) => a.releaseId - b.releaseId);
    return sortedData;
  } catch (error) {
    console.error('Error fetching releases from DynamoDB', error);
    return [];
  }
};