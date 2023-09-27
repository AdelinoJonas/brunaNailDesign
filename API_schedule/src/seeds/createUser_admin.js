const bcrypt = require("bcrypt");
const Knex = require("knex");

exports.seed = async function(knex) {
  try {
    const password = await bcrypt.hash("password", 10);
    await knex('users').del(); // Exclui todos os registros existentes na tabela 'users'
    await knex('users').insert([
      {
        name: "Bruna Pereira",
        email: "brunapereira@studio.com.br",
        phone: "00 0000 0000",
        password,
        is_admin: true,
      },
    ]);
  } catch (error) {
    console.error('Ocorreu um erro durante a semente de dados:', error);
  }
};
