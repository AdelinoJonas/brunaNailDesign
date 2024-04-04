import knex from '../../knex';

export async function up(): Promise<void> {
  await knex.schema.createTable("services", (table) => {
    table.increments("service_id").primary();
    table.string("title", 255).notNullable();
    table.string("price", 255).notNullable();
    table.string("duration", 255).notNullable();
    table.string("description", 255).notNullable();
    table.string("image", 255);
    table.boolean("is_course");
  });
}

export async function down(): Promise<void> {
  await knex.schema.dropTableIfExists("services");
}
