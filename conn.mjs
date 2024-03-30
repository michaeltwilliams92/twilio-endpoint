const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://michaeltwilliams92:RedLag00n1!2@3#@cluster0.gktdpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("sample_training");
export default db;