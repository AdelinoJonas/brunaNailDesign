function generatePass({ email, phone }) {
  return email.toLowerCase().slice(0, 4) + phone.replace(" ", "").slice(0, 4);
}

module.exports = {
  generatePass,
};
