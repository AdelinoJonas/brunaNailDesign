const yup = require("yup");

const loginValidatorSchema = yup.object().shape({
    email: yup.string().email().required("Por favor informe o email."),
    password: yup.string().required("Por favor informe a senha")
})

module.exports = { loginValidatorSchema };