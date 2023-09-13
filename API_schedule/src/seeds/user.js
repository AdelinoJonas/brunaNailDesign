const bcrypt = require("bcrypt");

const Knex = require("knex");

exports.seed = async function(knex) {
  
  const password = await bcrypt.hash("password",10)
  
  // Deletes ALL existing entries
  // await knex('users').del()
  await knex('users').insert([
    {
      name: "Bruna Pereira",
      email: "brunapereira@studio.com.br",
      phone: "00 0000 0000",
      password,
      is_admin: true,
    },
  ]);
};
