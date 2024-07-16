import Phone from "../../src/domain/Phone";

test("Deve validar o telefone", function() {
  const phone = "41984498900";
  const isValid = new Phone(phone);
  expect(isValid).toBeTruthy();
})

test("Não deve validar o telefone inválido", function() {
  const phone = "84498900";
  expect(() => new Phone(phone)).toThrow(new Error("Invalid Phone"));
})