const bcrypt = require("bcrypt");
const { AppError } = require("../utils/error");
const generateNickname = require("../utils/nicknameGenerator");
const generateAvatar = require("../utils/avatarGenerator");

const registerWithEmail = (userRepository) => async (data) => {
  try {
    const [user, errUser] = await userRepository.findUserByEmail(data.email);
    if (errUser) throw errUser;
    if (user) throw new AppError(409, "Email has already in use");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const nickname = generateNickname();
    const avatarUrl = generateAvatar();

    const userInput = {
      email: data.email,
      password: hashedPassword,
      nickname,
      avatarUrl,
    };

    const [newUser, errNewUser] = await userRepository.createUser(userInput);
    if (errNewUser) throw errNewUser;

    return [newUser, null];
  } catch (err) {
    return [null, err];
  }
};

const loginWithEmail = (userRepository, tokenService) => async (data) => {
  try {
    const [user, err] = await userRepository.findUserByEmail(data.email);
    if (err) throw err;

    if (!user) throw new AppError(401, "User not found");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new AppError(401, "Wrong password");

    const token = tokenService.sign({ id: user.id });

    return [{ user: user, token: token }, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (userRepository, tokenService) => {
  return {
    registerWithEmail: registerWithEmail(userRepository),
    loginWithEmail: loginWithEmail(userRepository, tokenService),
  };
};
