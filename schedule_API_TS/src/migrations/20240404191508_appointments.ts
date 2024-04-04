import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("appointments", (table) => {
    table.increments("appointment_id").primary();
    table.string("user_id", 255).notNullable();
    table.string("service_id", 255).notNullable();
    table.string("schedule_id", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("appointments");
}