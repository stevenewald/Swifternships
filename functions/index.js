const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://swifternships-default-rtdb.firebaseio.com/",
});

let studentRef = admin.database().ref("students");
let businessRef = admin.database().ref("employers");
exports.beforeAcc = functions.auth.user().beforeCreate(async (user) => {
  await businessRef.child(user.uid).set({
    signed_up: false,
    email: user.email,
  });
  if (user.email.includes("northwestern.edu")) {
    await studentRef.child(user.uid).set({
      signed_up: false,
      email: user.email,
    });
  }
  return true;
});
