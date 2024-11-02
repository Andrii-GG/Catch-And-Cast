import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const MenuTab2 = ({ item }) => {
  return (
    <div className="menuTab">
      <div className="menuTab2-list">
        {item.productCharacteristics?.length ? (
          item.productCharacteristics.map(
            ({ nameOfCharacteristic, descriptionOfCharacteristic }, index) => (
              <React.Fragment key={index}>
                <span>{nameOfCharacteristic}</span>
                <span>{descriptionOfCharacteristic}</span>
              </React.Fragment>
            )
          )
        ) : (
          <span>Пусто</span>
        )}
      </div>
    </div>
  );
};

export default MenuTab2;
