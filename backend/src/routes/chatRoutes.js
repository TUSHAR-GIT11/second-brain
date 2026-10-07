const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const retrieveChunks = require("../services/retrievalService");
const generateAnswer = require("../services/generationService");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Query is required",
      });
    }

    const chunks = await retrieveChunks(query, req.userId);

    if (chunks.length === 0) {
      return res.status(200).json({
        answer: "I don't know based on your knowledge base.",
        sources: [],
      });
    }

    const context = chunks.map((chunk) => chunk.content).join("\n\n");

    const answer = await generateAnswer(query, context);

    res.status(200).json({
      answer,
      sources: chunks,
    });
  } catch (error) {
    console.error("Chat error:", error);

    if (error.status === 429) {
  return res.status(429).json({
    message: "AI usage limit reached. Please try again later.",
  });
}

if (error.status === 503) {
  return res.status(503).json({
    message: "AI service is temporarily unavailable. Please try again.",
  });
}

    res.status(500).json({
      message: "Failed to generate answer",
    });
  }
});

module.exports = router;