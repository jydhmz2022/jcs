import React from 'react';
import './styles/appGlobal.css';
import LanguageSelector from './languageSelector/LanguageSelecror';

function Header() {
  return (
    <div className="header">
      
  <a href="/"><img src={`${process.env.PUBLIC_URL}/logo.png`}  className='logo' alt='logo'/></a>
  <a href='/turbo'><button  className='turbo-button'>Turbo {">>>"} </button></a>
    <div><LanguageSelector/></div>
    
    </div>
  );
} 

export default Header;
