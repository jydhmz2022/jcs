const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configuration du transporteur de messagerie
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
});

// Définition de la Firebase Cloud Function
exports.sendEmail = functions.https.onRequest(async (req, res) => {
  // Vérifier que la requête est une méthode POST
  if (req.method !== 'POST') {
    return res.status(400).send('Méthode non autorisée');
  }

  // Extraire les données du formulaire de la requête POST
  const { name, number, email, message } = req.body;

  // Paramètres de l'e-mail
  const mailOptions = {
    from: functions.config().email.user,
    to: 'jcsgroup24@gmail.com',
    subject: 'Nouveau message de votre site web JCS GROUP',
    text: `
      Nom: ${name}
      Numéro de téléphone: ${number}
      Adresse e-mail: ${email}
      Message: ${message}
    `
  };

  try {
    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);
    return res.status(200).send('E-mail envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    return res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
  }
});




// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
