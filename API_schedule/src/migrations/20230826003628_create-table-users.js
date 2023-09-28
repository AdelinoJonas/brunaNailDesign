const { BaseRepository } = require("@cubos/knex-repository");
const Knex = require("knex");

exports.up = async function (knex) {
  await Knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("phone", 20).notNullable();
    table.string("password", 10).notNullable();
    table.timestamp("created_at").defaultTo(Knex.fn.now());
    table.boolean("is_admin");
  });
};

exports.down = async function (knex) {
  await BaseRepository.dropTable(knex, "users");
};