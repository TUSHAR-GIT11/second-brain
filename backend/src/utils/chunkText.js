const chunkText = (text, chunkSize = 500, overlap = 50) => {
  const words = text.trim().split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");

    if (chunk) {
      chunks.push(chunk);
    }
  }

  return chunks;
};

module.exports = chunkText;