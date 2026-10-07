const mongoose = require("mongoose");
const Chunk = require("../models/Chunk");
const generateEmbedding = require("./embeddingService");

const retrieveChunks = async (query, userId, limit = 5) => {
  const queryEmbedding = await generateEmbedding(query);

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

  return results;
};

module.exports = retrieveChunks;