export default class Phone {
  value: string;

  constructor (value: string) {
    if(!this.validate(value)) throw new Error("Invalid Phone");
    this.value = value;
  }

  validate (phone: string) {
    return String(phone)
    .match(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
    );
  }

  getValue(): string {
    return this.value;
  }
}