import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("phone", 20).notNullable();
    table.string("password", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_admin").defaultTo(false);
    table.boolean("is_active").defaultTo(true);
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}