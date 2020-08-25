const db = require("../../data/connection.js");

module.exports = {
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

async function addTask(task) {
  try {
    const [id] = await db("tasks").insert(task, "id");
    return getTaskById(id);
  } catch(error) {
    throw error;
  }
}

function getAllTasks() {
  return db("tasks");
}

function getTaskById(id) {
  return db("tasks").where({ id }).first();
}

function updateTask(changes, id) {
  return db("tasks")
    .where({ id })
    .update(changes,id)
    .then(() => {
      return getTaskById(id);
    });
}

function deleteTask(id) {
  return db("tasks").where({ id }).del();
}