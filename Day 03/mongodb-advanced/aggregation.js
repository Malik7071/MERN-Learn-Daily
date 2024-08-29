const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

(async function() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to database');
    const db = client.db(dbName);
    const collection = db.collection('sales');

    const aggregationPipeline = [
      { $match: { status: 'A' } },  // Match documents with status 'A'
      { $group: { _id: '$item', total: { $sum: '$amount' } } },  // Group by item and sum the amounts
      { $sort: { total: -1 } }  // Sort the results by total in descending order
    ];

    const results = await collection.aggregate(aggregationPipeline).toArray();
    console.log('Aggregation Results:', results);
  } finally {
    await client.close();
  }
})();
