import knex from '../../knex';
const bcrypt = require("bcrypt");

export async function seed(): Promise<any> {
  const password = await bcrypt.hash("Bruna24", 10);
  await knex("users").del();
  const client = await knex("users").insert([
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