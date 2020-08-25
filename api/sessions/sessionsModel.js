const db = require("../../data/connection.js");

module.exports = {
  addSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};

async function addSession(session) {
  try {
    const [id] = await db("sessions").insert(session, "id");
    return getSessionById(id);
  } catch(error) {
    throw error;
  }
}

function getAllSessions() {
  return db("sessions");
}

function getSessionById(id) {
  return db("sessions").where({ id }).first();
}

function updateSession(changes, id) {
  return db("sessions")
    .where({ id })
    .update(changes,id)
    .then(() => {
      return getSessionById(id);
    });
}

function deleteSession(id) {
  return db("sessions").where({ id }).del();
}