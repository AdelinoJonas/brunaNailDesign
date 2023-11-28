const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig);
const { BaseRepository } = require("@cubos/knex-repository");

class UserByAdminRepository extends BaseRepository {
  constructor() {
    super(knex, "users");
  }
  async create(user) {
    const userId = await this.knex('users').insert(user).returning('id');
    return userId;
  }
  async get(id) {
    const user = this.users.filter((user) => user.id === id);
    return user[0];
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
    return deletedCount;
  }
}

module.exports = { UserByAdminRepository };