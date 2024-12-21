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

module.exports = (authService) => {
  return {
    registerWithEmail: registerWithEmail(authService),
  };
};
