const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    sourceType: {
      type: String,
      enum: ["text", "url"],
      required: true,
    },

    sourceUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

noteSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Note", noteSchema);