const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

(async function() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to database');
    const db = client.db(dbName);
    const collection = db.collection('myCollection');

    // Create
    const insertResult = await collection.insertOne({ name: 'Alice', age: 25 });
    console.log('Insert Result:', insertResult);

    // Read
    const findResult = await collection.findOne({ name: 'Alice' });
    console.log('Found Document:', findResult);

    // Update
    const updateResult = await collection.updateOne({ name: 'Alice' }, { $set: { age: 26 } });
    console.log('Update Result:', updateResult);

    // Delete
    const deleteResult = await collection.deleteOne({ name: 'Alice' });
    console.log('Delete Result:', deleteResult);
  } finally {
    await client.close();
  }
})();
