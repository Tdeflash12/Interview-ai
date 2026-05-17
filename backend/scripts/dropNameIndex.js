require('dotenv').config();
const mongoose = require('mongoose');

async function run(){
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  try{
    await db.collection('users').dropIndex('name_1');
    console.log('Dropped index name_1');
  }catch(err){
    console.error('Error dropping index:', err.message);
  }
  await mongoose.disconnect();
}
run().catch(err=>{console.error(err); process.exit(1)})
