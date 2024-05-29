import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("schedules", (table) => {
    table.increments("schedule_id").primary();
    table.string("available_day", 255).notNullable();
    table.time("start_time");
    table.time("end_time");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_free").defaultTo(true);
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("schedules");
}

