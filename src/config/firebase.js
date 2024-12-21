const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const fireauth = require("firebase/auth");
const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
});

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);
const auth = fireauth.getAuth(app);

module.exports = { admin, app, db, auth };
