const { Player, playerConverter } = require("../models/player");

const createPlayer = (firestore, db) => async (data) => {
  try {
    const newPlayerRef = firestore
      .doc(firestore.collection(db, "players"))
      .withConverter(playerConverter);

    await firestore.setDoc(newPlayerRef, new Player(data));

    return [newPlayerRef, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (firestore, db) => {
  return {
    createPlayer: createPlayer(firestore, db),
  };
};
