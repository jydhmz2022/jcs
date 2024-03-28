import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Accueil from "./components/Accueil";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Provider, useDispatch, useSelector } from "react-redux";
import {store} from "./store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import LanguageProvider from "./LanguageProvider";

function App() {
  // const { i18n } = useTranslation();
  // const currentLanguage = useSelector(
  //   (state) => state.language.currentLanguage
  // );
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   i18n.changeLanguage(currentLanguage);
  // }, [currentLanguage, i18n]);

  // const changeLanguage = lng => {
  //   dispatch({ type: "language/setLanguage", payload: lng }); 
  // };
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content-container">
            <Routes>
              <Route exact path="/" element={<Accueil />} />
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
    <LanguageProvider/>
    </Provider>
  );
}

export default App;
