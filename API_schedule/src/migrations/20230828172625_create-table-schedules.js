const { BaseRepository } = require("@cubos/knex-repository")

const Knex = require("knex")

exports.up = async function (knex) {
  await knex.schema.createTable('schedules', (table)=> {
    table.uuid('id').defaultTo(knex.fn.uuid());
    table.date("date").notNullable();
    table.time("start").notNullable();
    table.time("end").notNullable();
  })
};

exports.down = async function (knex) {
    await BaseRepository.dropTable(knex, "schedules");
};