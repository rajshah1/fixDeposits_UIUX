const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.TestFunction = functions.https.onRequest((req, res) => {
    const userDetails = req.body;
});