const formatter = require("../utils/responseFormatter");

const getCurrentUser = (userService) => async (req, res, next) => {
  const user = req.user;

  try {
    const [currentUser, err] = await userService.getUserById(user.id);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Get current user success",
      data: formatter.user(currentUser),
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = (userService) => async (req, res, next) => {
  const user = req.user;
  const { nickname, avatar_url } = req.body;

  const data = {
    id: user.id,
    nickname,
    avatar_url,
  };

  try {
    const [updatedUser, err] = await userService.updateUser(data);
    if (err) throw err;

    res.status(200).json({
      success: true,
      message: "Update user success",
      data: formatter.user(updatedUser),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (userService) => {
  return {
    getCurrentUser: getCurrentUser(userService),
    updateUser: updateUser(userService),
  };
};
