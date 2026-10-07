const chunkText = require("../utils/chunkText");
const generateEmbedding = require("./embeddingService");
const Chunk = require("../models/Chunk");

const ingestNote = async (note) => {
  const chunks = chunkText(note.content);

  const embeddings = await Promise.all(
    chunks.map((chunk) => generateEmbedding(chunk))
  );

  await Chunk.deleteMany({ noteId: note._id });

  const chunkDocuments = chunks.map((content, index) => ({
    noteId: note._id,
    userId: note.userId,
    content,
    embedding: embeddings[index],
    chunkIndex: index,
  }));

  await Chunk.insertMany(chunkDocuments);

  return chunkDocuments.length;
};

module.exports = ingestNote;