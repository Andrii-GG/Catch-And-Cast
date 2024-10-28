import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const MenuTab3 = ({ item }) => {
  useEffect(() => {
    // const dropdownMenu = document.querySelector(".dropdown-wall");
    // dropdownMenu.style.display = "block";
    // setTimeout(() => {
    //   dropdownMenu.classList.add("dropdown-menu-show");
    // }, 0);
    // return () => {
    //   setTimeout(() => {
    //     dropdownMenu.style.display = "none";
    //   }, 300);
    //   dropdownMenu.classList.remove("dropdown-menu-show");
    // };
  }, []);

  return (
    <div className="menuTab">
      <div className="menuTab3-block">
        <span className="itemPage-horizontal"></span>
      </div>
    </div>
  );
};

export default MenuTab3;
