exports.up = async function (knex) {
  return knex.schema.createTable('schedules-reuniao', (table) => {
    table.increments('id').primary();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    table
      .integer('reuniao_id')
      .notNullable()
      .references('id')
      .inTable('reunioes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable('schedules-reuniao');
};
