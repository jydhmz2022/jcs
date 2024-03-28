import React from 'react';
import { useTranslation } from "react-i18next";
import homeData from '../data/homeData';

function Services() {
  const { t } = useTranslation()
  return (
    <div className="content"> 
    { homeData.map((service, index) => (  <div key={index} className="service">
       <h2 className="service-title">
          <a href="/contact" className="custom-link">{t(service.title)}</a>
        </h2>
      <p>{t(service.description)}</p>
    </div>))}
  </div> 
  );
}

export default Services;
