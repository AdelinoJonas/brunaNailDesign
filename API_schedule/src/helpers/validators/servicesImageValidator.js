const yup = require("./config");


const validateImage = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(),
  servicesId:yup.string().id().required()
});

module.exports={
  validateImage
}