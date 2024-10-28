import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

let category = [
  { name: "Вудилища", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Котушки", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Приманки", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Харчування", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Гачки", CategoryImageUrl: "/icons/bag.svg" },
];

const Dropdown = ({ isOpen, setOpen, setFilter }) => {
  useEffect(() => {
    const dropdownMenu = document.querySelector(".dropdown-wall");

    if (dropdownMenu) {
      if (isOpen) { 
        dropdownMenu.style.display = "block";
        setTimeout(() => {
          dropdownMenu.classList.add("dropdown-menu-show");
        }, 0);
      } else {
        setTimeout(() => {
          dropdownMenu.style.display = "none";
        }, 300);
        dropdownMenu.classList.remove("dropdown-menu-show");
      }
    }
    dropdownMenu.style.width = window.getComputedStyle(
      document.querySelector(".header-category")
    ).width;

    let inputPosition = document.querySelector(".home-inputPosition");
    if (inputPosition) {
      inputPosition = inputPosition.getBoundingClientRect();
      dropdownMenu.style.top = inputPosition.top + 40 + "px";
    }

    dropdownMenu.style.left =
      document.querySelector(".header-category").getBoundingClientRect().left +
      "px";
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // очищення слухача при демонтуванні
    };
  }, []);

  const handleScroll = () => {
    const dropdownMenu = document.querySelector(".dropdown-wall");

    dropdownMenu.style.top =
      document.querySelector(".header-category").getBoundingClientRect().top +
      40 +
      "px";
  };

  function handleClick(name) {
    localStorage.setItem("filter", name);
    setFilter(name);
    setOpen(false);
    document
      .querySelector(".header-arrow")
      .classList.toggle("header-arrow-active");
  }

  return ReactDOM.createPortal(
    <div className="dropdown-wall">
      <div className="dropdown-menu">
        <ul>
          <li
            onClick={() => {
              handleClick("Всі товари");
            }}
          >
            Всі товари
          </li>
          {category.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                handleClick(item.name);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Dropdown;
