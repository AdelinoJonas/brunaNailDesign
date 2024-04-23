import Service from "../../domain/Service";
import knex from '../../../knex';
import ServiceRepository from "../../application/repository/ServiceRepository";

export default class ServiceRepositoryDataBase implements ServiceRepository {

  async save (service: Service) {
    const { title, price, duration, description, image, is_course } = service;
    const userData = await knex('services').insert({
      title,
      price, 
      duration, 
      description, 
      image, 
      is_course
    });   
    return (userData[0]);
  }

  // async get (userId: string) {
  //   const userData = await knex('users')
  //   .select()
  //   .where('user_id', userId)
  //   .first();
  //   return {
  //     userId: userData.user_id,
  //     name: userData.name,
  //     email: userData.email,
  //     phone: userData.phone,
  //   };
  // }

  // async update(userId: string, user: Partial<User>) {
  //   const { name, email, phone, password} = user;
  //   const passHashed = await bcrypt.hash(`${password}`, 10);
  //   await knex('users')
  //     .where('user_id', userId)
  //     .update({
  //       name,
  //       email: email?.value,
  //       phone: phone?.value,
  //       password: passHashed?.value,
  //     });
  //   return user;
  // }

  // async delete (userId: string) {
  //   await knex('users')
  //   .where('user_id', userId)
  //   .del()
  //   return {message: "User deleted successfully"}
  // }
}