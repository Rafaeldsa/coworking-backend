exports.up = async function (knex) {
  return knex.schema.createTable('reunioes', (table) => {
    table.increments('id').primary();
    table
      .integer('workstation_id')
      .notNullable()
      .references('id')
      .inTable('workstations');
    table.string('nome').notNullable();
    table.string('descrição').notNullable();
    table.string('sala').notNullable();
    table.string('criador').notNullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('reunioes');
};
