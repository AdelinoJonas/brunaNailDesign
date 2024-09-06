export const phoneMask = value => {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}





