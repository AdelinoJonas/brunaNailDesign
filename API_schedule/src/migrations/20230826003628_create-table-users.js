const { BaseRepository } = require("@cubos/knex-repository")

const Knex = require("knex")

exports.up = async function (knex) {
  await knex.schema.createTable('users', (table)=> {
    table.uuid('id').primary().notNullable();

    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('phone').unique().notNullable();
    table.string('password', 10).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.boolean('is_admin').defaultTo(false).notNullable();
  })
};

exports.down = async function (knex) {
    await BaseRepository.dropTable(knex, "users");
};
