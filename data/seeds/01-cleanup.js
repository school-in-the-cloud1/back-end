const { clean } = require("knex-cleaner");

exports.seed = async function(knex) {
  await knex('users').del()
  await knex('tasks').del()
  await knex('sessions').del()

  return clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
};