const Note = require("../models/Note");
const ingestNote = require("../services/ingestionService");
const fetchUrlContent = require("../services/urlService");
const Chunk = require("../models/Chunk");

const createNote = async (req, res) => {
  try {
    const { title, content, sourceType, sourceUrl } = req.body;

    let noteContent = content;

if (sourceType === "url") {
  if (!sourceUrl) {
    return res.status(400).json({
      message: "Source URL is required",
    });
  }

  noteContent = await fetchUrlContent(sourceUrl);
}

    const note = await Note.create({
  userId: req.userId,
  title,
  content: noteContent,
  sourceType,
  sourceUrl,
});

console.log("NOTE SAVED:", note._id);

    await ingestNote(note);

    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error);

    res.status(500).json({
      message: "Failed to create note",
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch note",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content, sourceType, sourceUrl } = req.body;

    let noteContent = content;

    if (sourceType === "url") {
      if (!sourceUrl) {
        return res.status(400).json({
          message: "Source URL is required",
        });
      }

      noteContent = await fetchUrlContent(sourceUrl);
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      {
        title,
        content: noteContent,
        sourceType,
        sourceUrl,
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await ingestNote(note);

    res.status(200).json(note);
  } catch (error) {
    console.error("Update note error:", error);

    res.status(500).json({
      message: "Failed to update note",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await Chunk.deleteMany({
      noteId: note._id,
      userId: req.userId,
    });

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);

    res.status(500).json({
      message: "Failed to delete note",
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};