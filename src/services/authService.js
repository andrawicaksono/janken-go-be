const { FirebaseError } = require("firebase/app");
const { AppError } = require("../utils/error");
const generateAvatar = require("../utils/avatarGenerator");
const generateNickname = require("../utils/nicknameGenerator");

const registerWithEmail =
  (userRepository, playerRepository) => async (data) => {
    try {
      const [user, userErr] = await userRepository.createUser(data);
      if (userErr) {
        if (
          userErr instanceof FirebaseError &&
          userErr.code === "auth/email-already-in-use"
        ) {
          throw new AppError(409, "Email already in use");
        }

        throw userErr;
      }

      const playerData = {
        uid: user.uid,
        nickname: generateNickname(),
        photoUrl: generateAvatar(),
        score: 0,
        xp: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
      };

      const [_, errPlayer] = await playerRepository.createPlayer(playerData);
      if (errPlayer) throw errPlayer;

      return [user, null];
    } catch (err) {
      return [null, err];
    }
  };

const loginWithEmail = (userRepository) => async (data) => {
  try {
    const [user, userErr] = await userRepository.loginWithEmail(data);
    if (userErr) {
      if (
        userErr instanceof FirebaseError &&
        userErr.code === "auth/invalid-credential"
      ) {
        throw new AppError(400, "Invalid email/password");
      }

      throw userErr;
    }

    return [user, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (userRepository, playerRepository) => {
  return {
    registerWithEmail: registerWithEmail(userRepository, playerRepository),
    loginWithEmail: loginWithEmail(userRepository),
  };
};
