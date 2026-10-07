const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAnswer = async (question, context) => {
  const prompt = `
You are a knowledge-base assistant.

Answer the user's question ONLY using the context provided below.

If the answer cannot be found in the context, say:
"I don't know based on your knowledge base."

Do not use outside knowledge.
Do not make up information.

Context:
${context}

Question:
${question}
`;

  const maxRetries = 2;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      if (error.status !== 503 || attempt === maxRetries) {
        throw error;
      }

      const delay = 2000 * (attempt + 1);

      console.log(
        `Gemini temporarily unavailable. Retrying in ${delay / 1000}s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

module.exports = generateAnswer;