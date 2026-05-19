const { GoogleGenAI } = require("@google/genai");
const { z, int } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { be } = require("zod/v4/locales");
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function invokeGeminiAi(
  prompt = "Hello Gemini! Explain what an interview is.",
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });
  console.log(response.text);
  return response;
}
const interviewReportSchema = z.object({
  mathScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 representing the candidate's performance in the math section of the interview. This score is used to evaluate the candidate's quantitative and problem-solving skills, which are crucial for many technical roles. A higher score indicates a stronger performance in the math section, while a lower score may suggest areas for improvement. This score can be used by interviewers to assess the candidate's suitability for roles that require strong mathematical abilities, such as software engineering, data science, and other technical positions.   ",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview."),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking the technical question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer the technical question,what points to be covered in the answer, what approach to be followed while answering the question.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with the intention of interviewer behind asking those questions and how to answer those questions.",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question can be asked in the interview."),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking the behavioral question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer the behavioral question,what points to be covered in the answer, what approach to be followed while answering the question.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with the intention of interviewer behind asking those questions and how to answer those questions.",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The skill gap that the candidate needs to work on."),
        severity: z
          .enum(["Low", "Medium", "High"])
          .describe("The severity of the skill gap."),
      }),
    )
    .describe(
      "Skill gaps that the candidate needs to work on along with the severity of those skill gaps.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The day number of the preparation plan."),
        focusArea: z
          .string()
          .describe("The focus area for that day in the preparation plan."),
        tasks: z
          .array(z.string())
          .describe(
            "The tasks to be done on that day in the preparation plan.",
          ),
      }),
    )
    .describe(
      "Preparation plan for the candidate to prepare for the interview, it includes day wise plan with focus area and tasks to be done on that day.",
    ),
});

async function generateInterviewReport({
  resume,
  jobDescription,
  selfDescription,
  mathScore,
}) {
  const prompt = `Generate an interview report based on the following information:
    Resume: ${resume}
    Job Description: ${jobDescription}
    Self Description: ${selfDescription}
    Math Score: ${mathScore}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: {
      responseMimeType: "application/json",
      jsonSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  return JSON.parse(response.text);
}

module.exports = generateInterviewReport;
