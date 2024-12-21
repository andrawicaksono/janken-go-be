const { Player, playerConverter } = require("../models/player");
const { AppError } = require("../utils/error");

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

const findPlayerByUid = (firestore, db) => async (uid) => {
  try {
    const q = firestore.query(
      firestore.collection(db, "players"),
      firestore.where("uid", "==", uid)
    );

    const querySnapshot = await firestore.getDocs(q);
    if (querySnapshot.empty) throw new AppError(404, "Player not found");

    const player = querySnapshot.docs[0].data();

    return [player, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (firestore, db) => {
  return {
    createPlayer: createPlayer(firestore, db),
    findPlayerByUid: findPlayerByUid(firestore, db),
  };
};
