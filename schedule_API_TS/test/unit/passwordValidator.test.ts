import { validate } from "../../src/PasswordValidator";
import Password from "../../src/domain/Password";

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
test("Deve validar a senha", function() {
  const password = "Bruna24";
  const isValid = new Password(password);
  expect(isValid).toBeTruthy();
})
test("Não deve validar uma senha inválido", function() {
  const password = "Bruna";
  expect(() => new Password(password)).toThrow(new Error("Invalid Password"));
})