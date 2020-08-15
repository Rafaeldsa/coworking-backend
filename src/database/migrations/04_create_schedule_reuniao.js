exports.up = async function (knex) {
  return knex.schema.createTable('schedules-meeting', (table) => {
    table.increments('id').primary();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
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
  return knex.schema.dropTable('schedules-meeting');
};
