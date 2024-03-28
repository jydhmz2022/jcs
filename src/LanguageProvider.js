import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../src/components/locales/i18n";

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch()

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  return <>{children}</>;
};

export default LanguageProvider;
