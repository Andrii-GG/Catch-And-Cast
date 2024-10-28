import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const MenuTab2 = ({ item }) => {
  return (
    <div className="menuTab">
      <div className="menuTab2-list">
        {Object.entries(item.characteristics).map(([key, value]) => {
          return (
            <>
              {" "}
              <span>{value[0]}</span>
              <span>{value[1]}</span>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MenuTab2;
