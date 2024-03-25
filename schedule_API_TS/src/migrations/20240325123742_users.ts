import knex from 'knex';

export const db = knex({
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

export async function up(): Promise<void> {
  await db.schema.createTable("users", (table: any) => {
    table.increments("user_id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("phone", 20).notNullable();
    table.string("password", 255).notNullable();
    table.timestamp("created_at").defaultTo(db.fn.now());
    table.boolean("is_admin").defaultTo(false);
  });
}
