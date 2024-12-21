const createUser = (fireauth, auth) => async (data) => {
  try {
    const userCredential = await fireauth.createUserWithEmailAndPassword(
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

const loginWithEmail = (fireauth, auth) => async (data) => {
  try {
    const userCredential = await fireauth.signInWithEmailAndPassword(
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

module.exports = (fireauth, auth) => {
  return {
    createUser: createUser(fireauth, auth),
    loginWithEmail: loginWithEmail(fireauth, auth),
  };
};
