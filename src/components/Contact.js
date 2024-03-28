// Contact.js
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import "../components/styles/contact.css";
import Loading from './Loading';


function Contact() {
  
  const backendPort = process.env.BACKEND_PORT  || 5005
  const backendURL = `http://localhost:${backendPort}/send-email/send`

  const {t, i18n} = useTranslation()
  const inputPlaceholderClass = i18n.language === 'ar' || i18n.language === 'hs' ? 'placeholder-right' : '';


  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, number, email, message }),
      });
      if (response.ok) {
        console.log("c ok")
        alert('Message envoyé avec succès !');
        setName('');
        setEmail('');
        setNumber('');
        setMessage('');
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      console.log("else 2")
      console.error('Erreur lors de l\'envoi du message :', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
    finally {
      setIsLoading(false); 
    }
  };


  return (
    <div className="content-contact">
      <h1>{t("Contactez-nous")}</h1>
      <div className="formulaire">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("Votre Nom...")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputPlaceholderClass}
          />
          <input
            type="text"
            placeholder={t("Votre Numéro de téléphone...")}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className={inputPlaceholderClass}
          />
          <input
            type="email"
            placeholder={t("Votre Adresse Email...")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputPlaceholderClass}
          />
          <textarea
            placeholder={t("Message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={inputPlaceholderClass}
          ></textarea>
          {isLoading? <Loading /> : <button type="submit">{t("Envoyer")}</button>}
        </form>
      </div>
      <div className="contact-info">
      <p className="email">jcsgroup24@gmail.com</p>
        <p className="phone">+222 42420020</p>
      </div>
    </div>
  );
}

export default Contact;

