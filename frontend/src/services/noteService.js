import api from "./api";

export const getNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const updateNote = async (noteId, noteData) => {
  const response = await api.put(`/notes/${noteId}`, noteData);
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};