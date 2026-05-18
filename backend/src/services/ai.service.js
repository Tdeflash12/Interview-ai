const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY,

});

async function invokeGeminiAi(prompt = "Hello Gemini! Explain what an interview is.") {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{
            role: "user",
            parts: [{ text: prompt }]
        }]
    });
    console.log(response.text);
    return response;
}
module.exports =  invokeGeminiAi;


