//@ts-nocheck
import knex from 'knex';
import { BaseRepository } from "@cubos/knex-repository";

const db = knex({
  client: 'mysql',
  connection: {
    host : '0.0.0.0',
    port : 3318,
    user : 'jonas',
    password : '123456',
    database : 'appbrunanail_db'
  },
  useNullAsDefault: true
});

export async function up(knex: knex): Promise<void> {
  await db.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("phone", 20).notNullable();
    table.string("password", 255).notNullable();
    table.timestamp("created_at").defaultTo(db.fn.now());
    table.boolean("is_admin").defaultTo(false);
  });
}

export async function down(knex: knex): Promise<void> {
  await BaseRepository.dropTable(knex, "users");
}
