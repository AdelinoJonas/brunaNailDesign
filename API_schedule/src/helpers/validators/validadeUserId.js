const yup = require("./config");

const validateUserId = yup.object().shape({
  id: yup.string().uuid("O id de usuário informado é inválido.").required(),
});

module.exports={
  validateUserId
}