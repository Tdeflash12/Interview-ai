const monggoose = require("mongoose");

/**
 * - job description schema: string
 * - resume text:string
 * - self description: string
 * - Math Score : Number
 * 
 * -Technical questions:[{
 *  question: String,
 *  answer: String,
 *  intention:''

 *       }]
 * - Behavioral questions:[{
 *    question: String,
 *    answer: String,
 *    intention:''
 *       }]
 * - Skill Gaps:[{
 *      skill: String,
 *    severity:{
 *    type: String,
 *   enum: ['Low', 'Medium', 'High']}}]
 * 
 * -Preparation Plan:[{
 *   Day: Number,
 *  focusArea: String,
 *  tasks:[String]}]
 
 */
const interviewReportSchema = new monggoose.Schema(
  {
    jobDescription: { type: String, required: true },
    resumeText: { type: String, required: true },
    selfDescription: { type: String, required: true },
    mathScore: { type: Number, min: 0, max: 100, required: true },
    technicalQuestions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        intention: { type: String },
        _id: false,
        },
    ],
    behavioralQuestions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        intention: { type: String },
        _id: false,
      },
    ],
    skillGaps: [
      {
        skill: { type: String, required: true },
        severity: {
          type: String,
          enum: ["Low", "Medium", "High"],
          required: true,
        },
        _id: false,
      },
    ],
    preparationPlan: [
      {
        day: { type: Number, required: true },
        focusArea: { type: String, required: true },
        tasks: [{ type: String ,required: true }],
      },
    ],
  },
  { timestamps: true },
);

const InterviewReportModel = monggoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = InterviewReport;
