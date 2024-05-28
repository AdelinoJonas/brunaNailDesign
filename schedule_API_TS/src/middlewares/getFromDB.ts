async function getUserFromDatabase(userId: string): Promise<any> {
  try {
    // Consulta ao banco de dados para buscar o usuário com base no userId
    const user = await UserModel.findById(userId);

    // Se o usuário for encontrado, retorná-lo
    if (user) {
      return user;
    } else {
      // Se o usuário não for encontrado, retornar null
      return null;
    }
  } catch (error) {
    // Lidar com erros de consulta ao banco de dados, se necessário
    console.error("Erro ao buscar usuário no banco de dados:", error.message);
    throw error;
  }
}