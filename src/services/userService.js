const { AppError } = require("../utils/error");

const getUserById = (userRepository) => async (id) => {
  try {
    const [user, userErr] = await userRepository.findUserById(id);
    if (userErr) throw userErr;

    if (!user) throw new AppError(404, "User not found");

    return [user, null];
  } catch (err) {
    return [null, err];
  }
};

const updateUser = (userRepository) => async (data) => {
  try {
    const [user, errUser] = await userRepository.findUserById(data.id);

    if (errUser) throw errUser;

    const updateData = {
      nickname: data.nickname ? data.nickname : user.nickname,
      avatarUrl: data.avatar_url ? data.avatar_url : user.avatar_url,
      id: data.id,
    };

    const [updatedUser, errUpdate] = await userRepository.updateUser(
      updateData
    );

    if (errUpdate) throw errUpdate;

    return [updatedUser, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (userRepository) => {
  return {
    getUserById: getUserById(userRepository),
    updateUser: updateUser(userRepository),
  };
};
