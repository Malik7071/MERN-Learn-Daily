const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

async function runAggregation() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('orders');

    // Example aggregation pipeline
    const pipeline = [
      { $match: { status: 'completed' } },
      { $group: { _id: '$customerId', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

runAggregation().catch(console.dir);
