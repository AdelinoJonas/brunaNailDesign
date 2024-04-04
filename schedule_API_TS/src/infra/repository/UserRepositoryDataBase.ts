import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/User";
const knex = require('knex')({
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
const bcrypt = require("bcrypt");

export default class UserRepositoryDataBase implements UserRepository {

  async save (user: User) {
    const { name, email, password, phone } = user;
    const passHashed = await bcrypt.hash(`${password.value}`, 10);
    const userData = await knex('users').insert({
      name,
      email: email.value,
      phone: phone.value,
      password: passHashed
    });  
    return (userData[0]);
  }

  async get (userId: string) {
    console.log(userId);
    const userData = await knex('users')
    .select()
    .where('user_id', userId)
    .first();
    return {
      userId: userData.user_id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    };
  }
}