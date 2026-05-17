require('dotenv').config();
const mongoose = require('mongoose');

async function run(){
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const indexes = await db.collection('users').indexes();
  console.log('indexes:', indexes);
  await mongoose.disconnect();
}
run().catch(err=>{console.error(err); process.exit(1)})
