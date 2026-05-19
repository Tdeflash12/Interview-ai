const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const InterviewReportModel = require('../models/interviewreport.model');
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
module.exports = { generateInterviewReportController };