exports.up = async function (knex) {
  return knex.schema.createTable('workstation-schedule', (table) => {
    table.increments('id').primary();
    table.string('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    table
      .integer('workstation_id')
      .notNullable()
      .references('id')
      .inTable('workstations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.boolean('disponivel').default(true);
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('workstation-schedule');
};
