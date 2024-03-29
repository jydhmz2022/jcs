import React from 'react';
import "./styles/appGlobal.css"
import { useTranslation } from 'react-i18next';

function Footer() {
  const {t} = useTranslation()
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3><a href="/contact" className="custom-link-footer"> {t("Contact")} </a></h3>
          </div>
          <div className="footer-section">
            <h3>{t("Qui nous sommes")}</h3>
          </div>
          <div className="footer-section">
            <h3>{t("FAQ")}</h3>
          </div>
        </div>
      </footer>
    );
  }

export default Footer;
