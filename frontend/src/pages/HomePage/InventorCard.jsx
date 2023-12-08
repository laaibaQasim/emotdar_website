import React, { useState } from 'react';
import './InventorCard.css';

const InventorCard = ({inventors, index}) => {
  console.log(index, inventors)
  return (
    <div className="inventor-slide-container">
      <div className="inventor-slide-content">
        <div className="inventor-card-wrapper">
          <div className="inventor-card">
              <div className="inventor-image-content">
                <span className="inventor-overlay"></span>
                <div className="inventor-card-image">
                  <img src={inventors[index].image} alt="" className="inventor-card-img" />
                </div>
              </div>
              <div className="inventor-card-content">
                <h2 className="inventor-name">{inventors[index].name}</h2>
                <p className="inventor-role">{inventors[index].role}</p>
              </div>
            </div>  
            <div className="inventor-card">
              <div className="inventor-image-content">
                <span className="inventor-overlay"></span>
                <div className="inventor-card-image">
                  <img src={inventors[index+1].image} alt="" className="inventor-card-img" />
                </div>
              </div>
              <div className="inventor-card-content">
                <h2 className="inventor-name">{inventors[index+1].name}</h2>
                <p className="inventor-role">{inventors[index+1].role}</p>
              </div>
            </div> 
        </div>
      </div>
    </div>
  );
};

export default InventorCard;