const { BaseRepository } = require("@cubos/knex-repository")

const Knex = require("knex")

exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable('appointments', (table)=> {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
    table.uuid("schedule_id").references("id").inTable("schedules").notNullable();
    table.uuid("service_id").references("id").inTable("services").notNullable();
    table.uuid("user_id").references("id").inTable("users").notNullable();
    table.time("time").notNullable();
  })
};

exports.down = async function (knex) {
    await BaseRepository.dropTable(knex, "schedules");
};