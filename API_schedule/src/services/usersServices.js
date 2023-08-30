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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      phone: formattedPhone,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(newUser);

    return createdUser;
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
