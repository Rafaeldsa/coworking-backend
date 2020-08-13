exports.up = async function (knex) {
  return knex.schema.createTable('rooms', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table
      .integer('workstation_id')
      .notNullable()
      .references('id')
      .inTable('workstations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('rooms');
};
