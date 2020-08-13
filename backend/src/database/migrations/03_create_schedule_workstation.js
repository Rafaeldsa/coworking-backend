exports.up = async function (knex) {
  return knex.schema.createTable('schedules-workstation', (table) => {
    table.increments('id').primary();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
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
  return knex.schema.dropTable('schedules-workstation');
};
