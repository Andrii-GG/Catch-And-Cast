import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";


const MenuTab1 = ({ item }) => {
  return (
    <div className="menuTab">
      {item?.productDescription ?  item.productDescription : "Пусто"}
    </div>
  );
};

export default MenuTab1;
