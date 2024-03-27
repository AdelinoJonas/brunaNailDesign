import { validate } from "../src/PhoneValidator";

test("Deve validar o telefone", function() {
  const phone = "41984498900";
  const isValid = validate(phone);
  expect(isValid).toBeTruthy();
})

test("Não deve validar o telefone inválido", function() {
  const phone = "84498900";
  const isValid = validate(phone);
  expect(isValid).toBeFalsy();
})