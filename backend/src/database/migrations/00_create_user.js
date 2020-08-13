exports.up = async function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.string('nome').notNullable().default('rafael');
    table.string('data_nascimento').notNullable().default('25031999');
    table.string('cpf').notNullable().default('01234567899');
    table.string('endereco_pessoal').notNullable().default('pb');
    table.string('biografia');
    table.boolean('isAdmin').default(false);
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('users');
};
