import React from "react";
import "./styles/turbo.css";
import { Colors } from "./constants/styles";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const apps = [
    {
      name: "Allo Turbo",
      description: "Service de transport.",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.jiyid.turbo_delivery&pcampaignid=web_share",
      iosLink: "https://apps.apple.com/fr/app/allo-turbo/id6670794071",
      logo: "allo-turbo.jpeg",
      backgroundColor: Colors.primaryColor,
      textColor: Colors.primaryColor,
    },
    {
      name: "Allo Turbo Driver",
      description: "Application pour les captains.",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.jiyid.tuboAppDriver&pcampaignid=web_share",
      iosLink: "https://apps.apple.com/fr/app/allo-turbo-driver/id6680186624",
      logo: "allo-turbo-driver.jpeg",
      backgroundColor: Colors.primaryColorTD,
      textColor: Colors.primaryColorTD,
    },
    {
      name: "ElMejless",
      description: "Plateforme d'échange.",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.jiyid.elmejless&pcampaignid=web_share",
      iosLink: "https://apps.apple.com/fr/app/elmejless/id6720764837",
      logo: "elmejless.jpeg",
      backgroundColor: Colors.blackColor,
      textColor: Colors.blackColor,
    },
  ];

  const openAppStore = (app) => {
    const link = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      ? app.iosLink
      : app.androidLink;
    window.open(link, "_blank");
  };

  return (
    <div className="app-container">
      <h2 className="product-title">{t("Nos Produits Numériques")}</h2>
      <div className="app-cards">
        {apps.map((app, index) => (
          <div
            key={index}
            className="app-card"
            onClick={() => openAppStore(app)}
          >
            <h3
              style={{
                color: app.textColor,
              }}
            >
              {app.name}
            </h3>
            <img src={app.logo} alt={`${app.name} logo`} className="app-logo" />
            <p>{app.description}</p>
            <button style={{ backgroundColor: app.backgroundColor }}>
              {t("Découvrir")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
