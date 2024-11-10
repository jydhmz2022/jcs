import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/appGlobal.css";
import homeData from "../data/homeData";

function Accueil() {
  const { t } = useTranslation();

  return (
    <div className="content">
      <h1>{t("Bienvenue sur notre site")}</h1>
      <p>{t("Découvrez nos services")}</p>

      {homeData.map((service, index) => (
        <div key={index} className="service">
          <h2 className="service-title">
            <a href="/contact" className="custom-link">
              {t(service.title)}
            </a>
          </h2>
          <img
            src={"/" + service.image}
            alt="Autre service numérique"
            className="service-image"
          />
          <p>{t(service.description)}</p>
        </div>
      ))}
    </div>
  );
}

export default Accueil;
