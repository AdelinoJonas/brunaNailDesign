const { randomUUID } = require("node:crypto");
const bcrypt = require("bcrypt")


exports.seed = async function (knex) {
  const password = await bcrypt.hash("password",10)
  // return knex('users')
  // // Deletes ALL existing entries
  // .del()
  // .then(
  // // Inserts seed entries
  // function () {
  return knex("users").insert([
    {
      id: randomUUID(),
      name: "User Admin",
      cpf: "00000000000",
      email: "useradmin@gmail.com.br",
      phone: "00 0000 0000",
      password,
      genre: "Masculino",
      is_admin: true,
    },
  ]);
  // }
  // )
};
