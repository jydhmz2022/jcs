import React from "react";
import "./styles/appGlobal.css";
import LanguageSelector from "./languageSelector/LanguageSelecror";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  return (
    <div className="header">
      <a href="/">
        <img src="/logo.png" className="logo" alt="logo" />
      </a>
      <a href="/products">
        <button className="turbo-button">
          {t("Nos Produits Numériques")} {">>>"}{" "}
        </button>
      </a>
      <div>
        <LanguageSelector />
      </div>
    </div>
  );
}

export default Header;
