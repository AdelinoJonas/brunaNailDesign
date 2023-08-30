const bcrypt = require("bcrypt");
const { formatReturnOnlyNumber } = require("../utils/formatOnlyNumber");
const {
  validateUser,
} = require("../helpers/validators/userValidator");

class UserService {
  userRepository;

  constructor(userRepository) {
    this.userRepository = userRepository;
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

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.insert({
      name,
      email,
      password: encryptedPassword,
      phone: formattedPhone,
    });

    return user;
  }

  async findUserByEmail({ email }) {
    const user = await this.userRepository.findOneBy({ email });


console.log(user);


    return user;
  }
}

module.exports = {
  UserService,
};
