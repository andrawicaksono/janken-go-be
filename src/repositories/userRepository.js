const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const createUser = (auth) => async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    return [user, null];
  } catch (err) {
    return [null, err];
  }
};

const loginWithEmail = (auth) => async (data) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredential.user;

    return [user, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (auth) => {
  return {
    createUser: createUser(auth),
    loginWithEmail: loginWithEmail(auth),
  };
};
