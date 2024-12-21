const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const fireauth = require("firebase/auth");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
  ),
});

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);
const auth = fireauth.getAuth(app);

module.exports = { admin, app, db, auth };
