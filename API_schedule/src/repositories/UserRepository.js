const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig);

const { BaseRepository } = require("@cubos/knex-repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(knex, "users");
  }

  async findAllUsers() {
    const allUsers = await this.knex('users')
      .select('id', 'name', 'email', 'phone', 'isAdmin');

    return allUsers;
  }

  async getUserDetails(userId) {
    const user = await this.knex('users')
      .select('id', 'name', 'email', 'phone', 'isAdmin')
      .where('id', userId)
      .first();

    return user;
  }
}

module.exports = { UserRepository };