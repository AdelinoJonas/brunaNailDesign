export const cpfMask = value => {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1').slice(0, 14)
}

export const cnpjMask = value => {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1').slice(0, 18)
}

export const fullNameMask = (value) => {
  value = value.replace(/\d+/g, '');
  const words = value.split(/\s+/);
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
};

export const phoneMask = value => {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}

export const cepMask = value => {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1').slice(0, 9)
}

// export const cepOAB = value => {
//   return String(value)
//     .replace(/\D/g, '')
//     .replace(/(\d)(\d{3})$/, '$1.$2')
// }




