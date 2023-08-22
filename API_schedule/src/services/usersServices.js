const bcrypt = require("bcrypt");
const { formatReturnOnlyNumber } = require("../utils/formatOnlyNumber");
const {
  validateUserUpdate,
  validateUser,
  validateUserId,
  validateUserStatus,
  validateChangePassword,
} = require("../helpers/validators/userValidator");

class UserService {
  userRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser({
    name,
    cpf,
    email,
    phone,
    oab,
    password,
    genre,
    is_admin,
    is_responsible,
    is_active,
    is_authorized,
    offices_id,
    nationality,
    civil_status,
    title,
  }) {
    const formattedCpf = formatReturnOnlyNumber(cpf);
    const formattedPhone = formatReturnOnlyNumber(phone);

    await validateUser.validate({
      name,
      cpf: formattedCpf,
      email,
      phone: formattedPhone,
      oab,
      password,
      genre,
      is_authorized,
      offices_id,
      nationality,
      civil_status,
      title,
    });

    const emailExists = await this.userRepository.findOneBy({ email });

    if (emailExists) {
      throw new Error(
        "Email já cadastrado anteriormente, por favor entre em contato com a administração."
      );
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.insert({
      name,
      cpf: formattedCpf,
      email,
      phone: formattedPhone,
      oab,
      password: encryptedPassword,
      genre,
      is_admin,
      is_responsible,
      is_active,
      is_authorized,
      offices_id,
      nationality,
      civil_status,
      title,
    });
    return user;
  }

  async updateUser({
    id,
    name,
    cpf,
    email,
    phone,
    oab,
    password,
    genre,
    is_active,
    is_authorized,
    deletedAt,
    nationality,
    civil_status,
    title,
  }) {
    const formattedCpf = formatReturnOnlyNumber(cpf);
    const formattedPhone = formatReturnOnlyNumber(phone);

    let encryptedPassword;

    if (password) {
      await validateChangePassword.validate({ password });
      encryptedPassword = await bcrypt.hash(password, 10);
    } else {
      await validateUserUpdate.validate({
        name,
        cpf: formattedCpf,
        email,
        phone: formattedPhone,
        oab,
        password,
        genre,
        is_active,
        is_authorized,
        nationality,
        civil_status,
        title,
      });
    }

    if (email) {
      const emailExists = await this.userRepository.findOneBy({ email });

      if (emailExists.id !== id) {
        throw new Error(
          "Email já cadastrado anteriormente, por favor entre em contato com a administração."
        );
      }
    }

    const user = await this.userRepository.update({
      id,
      name,
      cpf: formattedCpf,
      email,
      phone: formattedPhone,
      oab,
      password: encryptedPassword,
      genre,
      is_active,
      is_authorized,
      deletedAt,
      nationality,
      civil_status,
      title,
    });

    return user;
  }

  async getUser(id) {
    await validateUserId.validate({ id });

    const user = await this.userRepository.get(id);
    return user;
  }

  async getUserResponsible(id) {
    await validateUserId.validate({ id });
    const user = await this.userRepository.getResponsible(id);
    return user;
  }

  async getUserCommon(id) {
    await validateUserId.validate({ id });

    const user = await this.userRepository.getCommon(id);

    return user;
  }

  async findAllUser() {
    const list = await this.userRepository.findAll();

    return list;
  }

  async findUserByEmail({ email }) {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async findAllUsersWithOfficeInfos() {
    const list = await this.userRepository.findAllJoinOffices();

    return list;
  }

  async findAllUsersByStatusWithOfficeInfos(is_active) {
    await validateUserStatus.validate({ is_active });

    const list = await this.userRepository.findAllByStatus(is_active);

    return list;
  }

  async findUserBy(data) {
    const user = await this.userRepository.findOneBy(data);

    return user;
  }

  async findAllUsersBy(data) {
    const list = await this.userRepository.findBy(data);

    return list;
  }
}

module.exports = {
  UserService,
};
