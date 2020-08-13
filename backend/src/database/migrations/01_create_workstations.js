exports.up = async function (knex) {
  return knex.schema.createTable('workstations', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descrição').notNullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('workstations');
};
