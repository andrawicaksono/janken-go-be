const {
  doc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
} = require("firebase/firestore");
const { Player, playerConverter } = require("../models/player");
const { AppError } = require("../utils/error");

const createPlayer = (db) => async (data) => {
  try {
    const newPlayerRef = doc(collection(db, "players")).withConverter(
      playerConverter
    );

    await setDoc(newPlayerRef, new Player(data));

    return [newPlayerRef, null];
  } catch (err) {
    return [null, err];
  }
};

const findPlayerByUid = (db) => async (uid) => {
  try {
    const q = query(collection(db, "players"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new AppError(404, "Player not found");

    const player = querySnapshot.docs[0];

    return [player, null];
  } catch (err) {
    return [null, err];
  }
};

const updatePlayer = (db) => async (doc, data) => {
  try {
    const docRef = doc.ref;

    await updateDoc(docRef, data);

    return [data, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = (db) => {
  return {
    createPlayer: createPlayer(db),
    findPlayerByUid: findPlayerByUid(db),
    updatePlayer: updatePlayer(db),
  };
};
