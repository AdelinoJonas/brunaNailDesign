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
  password: yup.string().trim().required().min(6, "A senha deve ter entre 6 e 10 caracteres.").max(10, "A senha deve ter entre 6 e 10 caracteres."),
});

const validateUserUpdate = yup.object().shape({
  name: yup.string().matches(regex, "Apenas letras são permitidas no nome."),
  email: yup.string().email(),
  phone: yup.string(),
  password: yup
    .string()
    .trim()
    .min(6, "A senha deve ter entre 6 e 10 caracteres.")
    .max(10, "A senha deve ter entre 6 e 10 caracteres.")
    .required(),
  is_admin: yup.boolean(),
});

const validateChangePassword = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(6, "A senha deve ter entre 6 e 10 caracteres.")
    .max(10, "A senha deve ter entre 6 e 10 caracteres.")
    .required(),
});

module.exports = {
  validateUser,
  validateUserUpdate,
  validateChangePassword,
};
