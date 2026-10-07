const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAnswer = async (question, context) => {
  const prompt = `
You are a knowledge-base assistant.

Your task is to answer the user's question strictly and completely using ONLY the provided context.

IMPORTANT RULES:

1. Use only information explicitly present in the context.
2. Never use outside knowledge.
3. Never invent, assume, or add information.
4. If the question asks for multiple items, methods, steps, features, or examples, include ALL relevant items supported by the context.
5. Do not omit relevant items from the context.
6. If the same information appears multiple times, do not unnecessarily repeat it.
7. Keep the answer concise and directly answer the question.
8. Preserve technical names, method names, function names, and terminology exactly as they appear in the context.
9. If the answer cannot be found in the context, respond exactly with:
"I don't know based on your knowledge base."

Context:
${context}

User Question:
${question}

Answer:
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
};

module.exports = generateAnswer;