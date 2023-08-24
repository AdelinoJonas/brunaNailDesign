const yup = require("./config");

const validateId = yup.object().shape({
  id: yup.string().id("O id informado é inválido").required(),
});

module.exports={
  validateId
}