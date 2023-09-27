const { ServiceRepository } = require("../repositories/ServiceRepository");
const { ServiceNailsServices } = require("../services/ServiceNailsServices");
const { validateService } = require('../helpers/validators/serviceValidator')

const serviceRepository = new ServiceRepository();
const nails_Service = new ServiceNailsServices(serviceRepository);

async function createService(request, response) {
  const {
    title,
    price,
    duration,
    description,
    image,
    is_course,
  } = request.body;

  try {
    await validateService.validate({
      title,
      price,
      duration,
      description,
      image,
      is_course,
    });
    await nails_Service.createService({
      title,
      price,
      duration,
      description,
      image,
      is_course,
    });
    response.status(201).json({ message: "Serviço criado com sucesso" });
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message });
    } else {
      console.error(error);
      response.status(500).json({ error: "Erro ao criar o serviço." });
    }
  }
}

module.exports = {
  createService
};
