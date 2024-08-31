const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

(async function() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to database');
    const db = client.db(dbName);
    const collection = db.collection('products');

    // Create a single field index
    await collection.createIndex({ price: 1 });
    console.log('Single field index on price created');

    // Create a compound index
    await collection.createIndex({ category: 1, brand: 1 });
    console.log('Compound index on category and brand created');

    // Example query using the indexes
    const results = await collection.find({ category: 'electronics' }).toArray();
    console.log('Query Results:', results);
  } finally {
    await client.close();
  }
})();
