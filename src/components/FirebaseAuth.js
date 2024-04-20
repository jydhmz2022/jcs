import React, { useEffect, useState } from 'react';
import { app , auth} from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./styles/firebaseAuth.css"

const FirebaseAuth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  useEffect(() => {
    const token = localStorage.getItem("token")

    if (auth.currentUser ||  token) {
      window.location.href = '/turbo'
    }

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      //onLogin(userCredential.user);
      console.log('User signed up successfully:', userCredential.user);
      setError("")
      localStorage.setItem('token', userCredential.user.accessToken);
      window.location.href = '/turbo'

    } catch (error) {
      setError(error.message);
      if(error.code === "auth/invalid-credential") {
        setError("identifiant ou mot de passe incorrect")
      }
    }
  };

  return (
    <div className='formulaire'>
      <h2>Connexion Turbo</h2>
      <form onSubmit={handleLogin}>
      <input
            type="email"
            placeholder="Votre Adresse Email...."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Votre Mot de passe..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FirebaseAuth;
