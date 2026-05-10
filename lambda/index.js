const { DynamoDBClient, GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'YOUR-REGION' });
const TABLE  = 'YOUR-TABLE-NAME';
const CORS   = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  const method = event.requestContext.http.method;

  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  if (method === 'GET') {
    const keys = ['schedule', 'notices', 'todos', 'passwords', 'sim'];
    const result = {};
    for (const key of keys) {
      const res = await client.send(new GetItemCommand({
        TableName: TABLE,
        Key: marshall({ dataKey: key })
      }));
      if (res.Item) result[key] = JSON.parse(unmarshall(res.Item).data);
    }
    return { statusCode: 200, headers: CORS, body: JSON.stringify(result) };
  }

  if (method === 'PUT') {
    const { key, data } = JSON.parse(event.body || '{}');
    if (!key || data === undefined)
      return { statusCode: 400, headers: CORS, body: '{"error":"missing key or data"}' };
    await client.send(new PutItemCommand({
      TableName: TABLE,
      Item: marshall({ dataKey: key, data: JSON.stringify(data) })
    }));
    return { statusCode: 200, headers: CORS, body: '{}' };
  }

  return { statusCode: 405, headers: CORS, body: '{}' };
};
