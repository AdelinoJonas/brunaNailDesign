import { validate } from "../../src/PasswordValidator";

test("Deve validar a senha", function() {
  const password = "Bruna24";
  const isValid = validate(password);
  expect(isValid).toBeTruthy();
})

test("Não deve validar senha inválido", function() {
  const password = "84498900";
  const isValid = validate(password);
  expect(isValid).toBeFalsy();
})