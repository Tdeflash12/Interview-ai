const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const InterviewReportModel = require('../models/interviewReport.model');


/**
 * @description This controller generates an interview report based on the user's self-description, resume PDF, and job description. It uses the pdf-parse library to extract text from the uploaded resume PDF and then calls the generateInterviewReport service to create an interview report. The generated report is then saved to the database using the InterviewReportModel.  
 * 
 */

async function generateInterviewReportController(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "Resume file is required",
    });
  }

  const resumeContent = await pdfParse(req.file.buffer);
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAI = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await InterviewReportModel.create({
    user: req.user.userId || req.user.id || req.user._id,
    resumeText: resumeContent.text,
    selfDescription,
    jobDescription,
    mathScore: interviewReportByAI.mathScore,
    technicalQuestions: interviewReportByAI.technicalQuestions,
    behavioralQuestions: interviewReportByAI.behavioralQuestions,
    skillGaps: interviewReportByAI.skillGaps,
    preparationPlan: interviewReportByAI.preparationPlan,
  });

  return res.status(201).json({
    message: "Interview Report Generated Successfully",
    interviewReport,
  });
}
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;
  const interviewReport = await InterviewReportModel.findOne({ _id: interviewId, user: req.user.userId || req.user.id || req.user._id   });
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview Report not found",
    });
  }

  return res.status(200).json({
    message: "Interview Report retrieved successfully",
    interviewReport,
  });
}

/** * @description This controller retrieves all interview reports associated with the logged-in user. It queries the InterviewReportModel to find all reports where the user field matches the ID of the currently authenticated user. The retrieved interview reports are then returned in the response.  
 * 
 */
async function getAllInterviewReportsController(req, res) { 
  const interviewReports = await InterviewReportModel.find({ user: req.user.userId || req.user.id || req.user._id  }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
  return res.status(200).json({
    message: "Interview Reports retrieved successfully",
    interviewReports,
  }); 
}
module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController };