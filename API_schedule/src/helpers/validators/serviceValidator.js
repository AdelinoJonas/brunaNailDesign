const yup = require("./config");


const validateService = yup.object().shape({
  title: yup.string().trim().required(),
  price: yup.string().trim().email().required(),
  duration: yup.string().trim().required(),
  description: yup.string().trim().required(),
  image: yup.string().trim(),
  is_course: yup.boolean(),
});

module.exports={
  validateService
}