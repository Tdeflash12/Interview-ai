require('dotenv').config();
const app = require('./src/app') 
const connectToDB=require('./src/config/database');
//const generateInterviewReport = require('./src/services/ai.service');
//const samples = require('./src/services/temp');

//generateInterviewReport(samples[0]);
connectToDB();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});