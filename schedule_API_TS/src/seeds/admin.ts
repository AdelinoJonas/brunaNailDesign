import knex from 'knex';
const bcrypt = require("bcrypt");

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

export async function seed(): Promise<any> {
  const password = await bcrypt.hash("Bruna24", 10);
  await db("users").del();
  const client = await db("users").insert([
    { 
      name: "Bruna Pereira",
      email: "brunapereira@studio.com.br",
      phone: "4100000099",
      password,
      is_admin: true
    },

]);
return (client);
   
};