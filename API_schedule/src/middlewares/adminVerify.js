async function adminVerify(request, response, next) {
  const { is_admin } = request.cookies.user;
  if (!is_admin) {
    return response.status(403).json({
      message:
        "Apenas administradores da plataforma podem utilizar essa função.",
    });
  }
  next();
}

module.exports = { adminVerify }
