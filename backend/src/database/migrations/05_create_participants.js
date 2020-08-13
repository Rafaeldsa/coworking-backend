exports.up = async function (knex) {
  return knex.schema.createTable('participants', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table
      .integer('meeting_id')
      .notNullable()
      .references('id')
      .inTable('meetings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('participants');
};
