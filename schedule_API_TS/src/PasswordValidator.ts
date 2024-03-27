export function validate(password: string) {
  return String(password)
  .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/);
}