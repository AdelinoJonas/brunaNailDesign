const { BaseRepository } = require("@cubos/knex-repository")

const Knex = require("knex")

exports.up = async function (knex) {
  await knex.schema.createTable('services', (table)=> {
    table.uuid('id').primary().notNullable();
    table.string('title').unique('Este titulo já existe').notNullable();
    table.string('description').notNullable();
    table.integer('price').notNullable();
    table.string('duration', 150).notNullable();
    table.string('image').notNullable();
    table.boolean('is_course').defaultTo(false);
  })
};

exports.down = async function (knex) {
    await BaseRepository.dropTable(knex, "services");
};
