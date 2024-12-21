const formatter = require("../utils/responseFormatter");

const registerWithEmail = (authService) => async (req, res, next) => {
  const { email, password } = req.body;
  const data = {
    email,
    password,
  };

  try {
    const [newUser, err] = await authService.registerWithEmail(data);
    if (err) throw err;

    res.status(201).json({
      success: true,
      message: "Register user with email success",
      data: formatter.auth.user(newUser),
    });
  } catch (err) {
    next(err);
  }
};

const loginWithEmail = (authService) => async (req, res, next) => {
  const { email, password } = req.body;
  const data = {
    email,
    password,
  };

  try {
    const [newUser, err] = await authService.loginWithEmail(data);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "User logged in with email success",
      data: formatter.auth.user(newUser),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (authService) => {
  return {
    registerWithEmail: registerWithEmail(authService),
    loginWithEmail: loginWithEmail(authService),
  };
};
