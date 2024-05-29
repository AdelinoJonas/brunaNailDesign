import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/User";
import knex from '../../../knex';

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
    const userData = await knex('users')
    .select()
    .where('user_id', userId)
    .first();
    return {
      userId: userData.user_id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
     is_admin: userData.is_admin,
    };
  }

  async getAllUsers(): Promise<User[]> {
    const userData = await knex('users').select('*');
    const users: User[] = userData.map(data => ({
      userId: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    }));

    return users;
  }
  
  async update(userId: string, user: Partial<User>) {
    const { name, email, phone, password} = user;
    const passHashed = await bcrypt.hash(`${password}`, 10);
    await knex('users')
      .where('user_id', userId)
      .update({
        name,
        email: email?.value,
        phone: phone?.value,
        password: passHashed?.value,
      });
    return user;
  }

  async delete (userId: string) {
    await knex('users')
    .where('user_id', userId)
    .del()
    return {message: "User deleted successfully"}
  }
}