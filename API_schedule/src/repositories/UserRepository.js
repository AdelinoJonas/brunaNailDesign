const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig);

const { BaseRepository } = require("@cubos/knex-repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(knex, "users");
  }

  async create(user) {
    const userId = await this.knex('users').insert(user).returning('id');
  
    return userId;
  }

  async findAllUsers() {
    const allUsers = await this.knex('users')
      .select('id', 'name', 'email', 'phone');

    return allUsers;
  }

  async getUserDetails(userId) {
    const user = await this.knex('users')
      .select('id', 'name', 'email', 'phone')
      .where('id', userId)
      .first();

    return user;
  }

  async findByEmail(email) {
    const user = await this.knex('users')
      .select('id', 'name', 'email', 'phone')
      .where('email', email)
      .first();

    return user;
  }

  async deleteUser(userId) {
    const deletedCount = await this.knex('users')
      .where('id', userId)
      .del();

    return deletedCount; // Retorna o número de registros excluídos (deve ser 1 se o usuário existir, 0 se não existir).
  }
}

module.exports = { UserRepository };