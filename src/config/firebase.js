const admin = require("firebase-admin");
require("dotenv").config();

const SERVICE_ACCOUNT_KEY_PATH = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const serviceAccountKey = require(SERVICE_ACCOUNT_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const firestore = admin.firestore();

module.exports = { admin, firestore };
