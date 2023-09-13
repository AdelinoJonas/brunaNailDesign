const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig);

const { BaseRepository } = require("@cubos/knex-repository");

class ServiceRepository extends BaseRepository {
  constructor() {
    super(knex, "services");
  }

  async createService(service) {
    const serviceId = await this.knex('services').insert(service).returning(service);
  
    return serviceId;
  }

  async deleteService(serviceId) {
    const deletedCount = await this.knex('services')
      .where('id', serviceId)
      .del();

    return deletedCount;
  }
}

module.exports = { ServiceRepository };