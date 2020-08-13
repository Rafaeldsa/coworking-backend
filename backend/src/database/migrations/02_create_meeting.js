exports.up = async function (knex) {
  return knex.schema.createTable('meetings', (table) => {
    table.increments('id').primary();
    table
      .integer('room_id')
      .notNullable()
      .references('id')
      .inTable('rooms')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('creator').notNullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('meetings');
};
