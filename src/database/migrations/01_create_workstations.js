exports.up = async function (knex) {
  return knex.schema.createTable('workstations', (table) => {
    table.increments('id');
    table.string('name').unique().notNullable();
    table.string('description').notNullable();
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('workstations');
};
