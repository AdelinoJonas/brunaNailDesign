const { BaseRepository } = require("@cubos/knex-repository")

const Knex = require("knex")

exports.up = async function (knex) {
  await knex.schema.createTable('appointment', (table)=> {
    table.uuid('id').primary().notNullable();
    table.uuid("schedule_id").references("id").inTable("schedules").notNullable();
    table.uuid("service_id").references("id").inTable("services").notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.time("time").notNullable();
  })
};

exports.down = async function (knex) {
    await BaseRepository.dropTable(knex, "schedules");
};