exports.up = async function (knex) {
  return knex.schema.createTable('reunioes', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descrição').notNullable();
    table.string('sala').notNullable();
    table.string('criador').notNullable();
    table.specificType('participantes', 'INT[]').notNullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('reunioes');
};
