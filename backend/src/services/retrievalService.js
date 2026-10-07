const mongoose = require("mongoose");
const Chunk = require("../models/Chunk");
const generateEmbedding = require("./embeddingService");

const retrieveChunks = async (query, userId, limit = 5) => {
  console.log("1. Generating query embedding...");

  const queryEmbedding = await generateEmbedding(query);

  console.log("2. Query embedding generated");

  const results = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 50,
        limit,
        filter: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
    },
    {
      $project: {
        _id: 0,
        content: 1,
        noteId: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  console.log("3. Vector search completed");

  console.log(
    "Scores:",
    results.map((result) => result.score)
  );

  const MINIMUM_SCORE = 0.70;

  const filteredResults = results.filter(
    (result) => result.score >= MINIMUM_SCORE
  );

  console.log(
    "4. Results after threshold:",
    filteredResults.length
  );

  return filteredResults;
};

module.exports = retrieveChunks;