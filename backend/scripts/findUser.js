require('dotenv').config();
const mongoose = require('mongoose');
const userModel = require('../src/models/user.model');

async function run(){
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await userModel.findOne({ email: 'test@example.com' }).lean();
  console.log('user:', user);
  await mongoose.disconnect();
}

run().catch(err=>{console.error(err); process.exit(1)})
