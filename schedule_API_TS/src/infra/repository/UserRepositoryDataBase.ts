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
    console.log(userData);
    return userData;
  }

  async getAllUsers(): Promise<User[]> {
    const userData = await knex('users').select('*');
    const users: User[] = userData.map(data => ({
      userId: data.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      is_active: data.is_active,
      is_admin: data.is_admin
    }));
    return users;
  }
  
  async update(userId: string, user: Partial<User>) {
    const { name, email, phone, password, is_active} = user;
    const passHashed = await bcrypt.hash(`${password}`, 10);
    await knex('users')
      .where('user_id', userId)
      .update({
        name,
        email: email?.value,
        phone: phone?.value,
        password: passHashed?.value,
        is_active
      });
      console.log(user);
      
    return user;
  }

  async delete (userId: string) {
    await knex('users')
    .where('user_id', userId)
    .del()
    return {message: "User deleted successfully"}
  }
}