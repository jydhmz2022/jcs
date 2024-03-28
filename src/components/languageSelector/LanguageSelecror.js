import React, { useState } from "react";
import "../styles/LanguageSelector.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage} from "../../slices/languageSlice";
const LanguageSelector = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentLanguage = useSelector(
    (state) => state.language?.currentLanguage
  );
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
    setModalVisible(false);
  };

  const getLanguageIcon = (lng) => {
    switch (lng) {
      case "ar":
        return `${process.env.PUBLIC_URL}/flags/ar-flag.png`;
      case "hs":
        return `${process.env.PUBLIC_URL}/flags/hs-flag.png`;
      case "en":
        return `${process.env.PUBLIC_URL}/flags/en-flag.png`;
      case "fr":
        return `${process.env.PUBLIC_URL}/flags/fr-flag.png`;
      default:
        return "";
    }
  };

  return (
    <div className="language-selector">
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>{t("Langues")}</h2>
            <div className="Language-div">
            <button onClick={() => changeLanguage("ar")} className="language-button">
            <img src={`${process.env.PUBLIC_URL}/flags/ar-flag.png`} alt="Autre service numérique" className="language-icon" />
            العربية
          </button>
          <button onClick={() => changeLanguage("hs")} className="language-button">
            <img src={`${process.env.PUBLIC_URL}/flags/hs-flag.png`} alt="Autre service numérique" className="language-icon" />
            الحسانية
          </button>
          <button onClick={() => changeLanguage("en")} className="language-button">
            <img src={`${process.env.PUBLIC_URL}/flags/en-flag.png`} alt="Autre service numérique" className="language-icon" />
            Anglais
          </button>
          <button onClick={() => changeLanguage("fr")} className="language-button">
            <img src={`${process.env.PUBLIC_URL}/flags/fr-flag.png`} alt="Autre service numérique" className="language-icon" />
            Français
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setModalVisible(true)} className="open-modal-button">
      {currentLanguage && (
          <img
            src={getLanguageIcon(currentLanguage)}
            alt={t("Autre service numérique")}
            className="selected-language-icon"
          />
        )}
      {t("Langues")}
     
      </button>
    </div>
  );
};

export default LanguageSelector;
