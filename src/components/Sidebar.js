import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Sidebar() {
  const {t} = useTranslation()
    return (
      <div className="sidebar">
        <ul>
          <li><Link to="/">{t("Accueil")}</Link></li>
          <li><Link to="/services">{t("Services")}</Link></li>
          <li><Link to="/contact">{t("Contact")}</Link></li>
        </ul>
      </div>
    );
  }

  export default  Sidebar;