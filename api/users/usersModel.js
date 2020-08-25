const db = require("../../data/connection.js");

module.exports = {
  register,
  getAllUsers,
  getUserById,
  filterUsersBy,
  deleteUser
};
async function register(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return getUserById(id);
  } catch(error) {
    throw error;
  }
}
function getAllUsers() {
  return db("users")
    .select("id", "username")
    .orderBy("id");
}

function getUserById(id) {
  return db("users")
    .where("id", id)
    .first();
}

function filterUsersBy(filter) {
  return db("users")
    .where(filter)
    .orderBy("id");
}

function deleteUser(id) {
  return db("users")
    .where({id})
    .del()
}
