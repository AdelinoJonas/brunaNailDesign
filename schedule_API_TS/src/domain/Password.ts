export default class Password {
  value: string;

  constructor (value: string) {
    if(!this.validate(value)) throw new Error("Invalid password");
    this.value = value;
  }
  
  validate (password: string) {
    return String(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/);
  }
}