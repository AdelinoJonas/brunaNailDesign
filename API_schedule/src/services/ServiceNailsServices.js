const {
  validateService,
} = require("../helpers/validators/serviceValidator");

class ServiceNailsServices {
  serviceRepository;

  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async createService({
    title,
    price,
    duration,
    description,
    image,
    is_course,
  }) {

    await validateService.validate({
      title,
      price,
      duration,
      description,
      image,
      is_course,
    });

    const newService = {
      title,
      price,
      duration,
      description,
      image,
      is_course,
    };

    const createdService = await this.serviceRepository.create(newService);

    console.log(createdService);

    return createdService;
  }

}

module.exports = {
  ServiceNailsServices,
};
