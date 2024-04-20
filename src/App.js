import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Accueil from "./components/Accueil";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Turbo from "./components/Turbo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { Provider, useDispatch, useSelector } from "react-redux";
import {store} from "./store";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LanguageProvider from "./LanguageProvider";
import FirebaseAuth from "./components/FirebaseAuth";

function App() {
  const [showHeaderAndSidebar, setShowHeaderAndSidebar] = useState(true);
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


  const [token, setToken] = useState(localStorage.getItem("token"));
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowHeaderAndSidebar(false);
    } else {
      setShowHeaderAndSidebar(true);
    }
  }, [token]);
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
      {showHeaderAndSidebar && <Header />}
        <div className="main-content">
          {showHeaderAndSidebar && <Sidebar />}
          <div className="content-container">
            <Routes>
              <Route exact path="/" element={<Accueil />} />
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/turbo" element={token ? <Turbo /> : <Navigate to="/firebaseAuth" />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/firebaseAuth" element={<FirebaseAuth />} />
            </Routes>
          </div>
        </div>
        {showHeaderAndSidebar && <Footer />}
      </div>
    </Router>
    <LanguageProvider/>
    </Provider>
  );
}

export default App;
