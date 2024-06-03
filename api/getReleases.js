import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'releases-db';

export default async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    const sortedData = data.Items.sort((a, b) => a.releaseId - b.releaseId);
    res.status(200).json(sortedData);
  } catch (error) {
    console.error('Error fetching releases from DynamoDB', error);
    res.status(500).json({ error: 'Error fetching releases' });
  }
};
