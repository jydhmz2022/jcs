const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Configuration du transporteur de messagerie
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
});

// Définition de la Firebase Cloud Function
exports.sendEmail = functions.https.onRequest((req, res) => {
    // Utilisation du middleware CORS pour autoriser les demandes cross-origin
    cors(req, res, () => {
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
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            return res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
          } else {
            console.log('E-mail envoyé avec succès :', info.response);
            res.set('Access-Control-Allow-Origin', '*');
            return res.status(200).send('E-mail envoyé avec succès');
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        return res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
      }
    });
  });
  
