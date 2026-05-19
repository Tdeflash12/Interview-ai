const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middleware/file.middleware');



const interviewRouter = express.Router();
/**
 * @ route POST /api/interview
 * @ description generate interview report on the basis of user self description,resume pdf and job description.
 * @ access Private
 * 
 */
interviewRouter.post('/', upload.single('resume'), authMiddleware.authUser, interviewController.generateInterviewReportController);

module.exports = interviewRouter;