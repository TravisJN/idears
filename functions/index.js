const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

admin.firestore().settings({ ignoreUndefinedProperties: true });

exports.createUser = functions.auth.user().onCreate((userRecord, context) => {
  const { email, uid } = userRecord;
  return db
    .collection("users")
    .doc(uid)
    .set({ email, createdAt: admin.firestore.FieldValue.serverTimestamp() });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
