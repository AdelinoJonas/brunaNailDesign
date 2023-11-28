const bcrypt = require("bcrypt");
const { formatReturnOnlyNumber } = require("../utils/formatOnlyNumber");
const {
  validateUser,
  validateUserId,
} = require("../helpers/validators/userValidator");

class UserByAdminService {
  userByAdminRepository;
  constructor(userByAdminRepository) {
    this.userByAdminRepository = userByAdminRepository;
  }
  async createUser({
    name,
    email,
    phone,
    password,
  }) {
    const formattedPhone = formatReturnOnlyNumber(phone);
    await validateUser.validate({
      name,
      email,
      password,
      phone: formattedPhone,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      phone: formattedPhone,
      password: hashedPassword,
    };
    console.log(newUser);
    const createdUser = await this.userByAdminRepository.create(newUser);
    console.log(createdUser);
    return createdUser;
  }
  async getUser(id) {
    await validateUserId.validate({ id });
    const user = await this.userByAdminRepository.get(id);
    return user;
  }
  async findUserByEmail({ email }) {
    const user = await this.userByAdminRepository.findOneBy({ email });
    return user;
  }
}

module.exports = {
  UserByAdminService
};
