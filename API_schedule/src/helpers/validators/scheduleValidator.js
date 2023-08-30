const yup = require("./config");

const regex = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
const timeRegex = /^(2[0-3]|[0-1]\d):[0-5]\d/;

const validateSchedule = yup.object().shape({
  scheduleDate: yup.date().required(),
  scheduleTime: yup.string().required().matches(timeRegex, "Horário inválido"),
  serviceId: yup.number().integer().required(),
  userId: yup.number().integer().required(),
  isCourse: yup.boolean(),
});

const validateScheduleId = yup.object().shape({
  id: yup.string().uuid("O id de audiência informado é inválido.").required(),
});

const validateScheduleUpdate = yup.object().shape({
  type: yup.string().uuid(),
  process_number: yup.string().trim(),
  opposing: yup.string().trim(),
  is_remote: yup.boolean(),
  date: yup.date(),
  time: yup.string().matches(timeRegex, "Horário inválido"),
  address_link: yup.string().trim(),
  is_notified: yup.boolean(),
});

module.exports = {
  validateprocedure,
  validateprocedureId,
  validateprocedureUpdate,
};
