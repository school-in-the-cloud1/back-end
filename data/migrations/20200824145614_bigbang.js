
exports.up = function(knex) {
  return knex.schema
    
    .createTable('users', tbl => {
      tbl.uuid('id');
      tbl.string('email', 255)
        .unique()
        .notNullable()
        .index();
      tbl.string('password', 255)
        .notNullable()
      tbl.string('role', 255)
        .notNullable()
      tbl.string('username', 255)
        .unique()
        .notNullable()
        .index();
      tbl.string('first_name', 255)
      tbl.string('last_name', 255)
      tbl.string('country', 255)
      tbl.string("timezone", 128)
      tbl.timestamps(true, true)
    })
  
    .createTable('todo', tbl => {
      tbl.uuid('id')
      tbl.string('title', 255)
        .notNullable()
      tbl.string('task')
        .notNullable()
      tbl.boolean('complete')
        .notNullable()
        .defaultTo(false);
      tbl.integer('assigned_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.integer('assigned_to')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.timestamps(true, true)
    })
    .createTable('sessions', tbl => {
      tbl.uuid('id')
      tbl.date('date')
        .notNullable()
      tbl.time('time')
        .notNullable()
      tbl.integer('duration')
        .notNullable()
      tbl.boolean('available')
        .notNullable()
        .defaultTo(true);
      tbl.integer('volunteer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.integer('student_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('sessions')
    .dropTableIfExists('todo')
    .dropTableIfExists('users')
};
