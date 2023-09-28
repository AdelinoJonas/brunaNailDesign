const yup = require("./config");

const regex = /^[a-zA-Z\u00C0-\u00FF\s]+$/;

const validateUser = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required()
    .matches(regex, "Apenas letras são permitidas no nome."),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().required(),
  password: yup.string().trim().required(),
});

const validateUserUpdate = yup.object().shape({
  name: yup.string().matches(regex, "Apenas letras são permitidas no nome."),
  email: yup.string().email(),
  phone: yup.string(),
  password: yup
    .string()
    .trim().required(),
  is_admin: yup.boolean(),
});

const validateChangePassword = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required(),
});

module.exports = {
  validateUser,
  validateUserUpdate,
  validateChangePassword,
};
