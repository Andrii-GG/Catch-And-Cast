import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("Всі товари");

  function handleClick() {
    setIsDropdownOpen(!isDropdownOpen);
    document
      .querySelector(".header-arrow")
      .classList.toggle("header-arrow-active");
  }

  useEffect(() => {
    localStorage.setItem("position", "Київ");
    const inputGroup = document.querySelector(".header-input-group");

    if (location.pathname === "/") {
      const position = window.scrollY;
      const inputPosition = document
        .querySelector(".home-inputPosition")
        .getBoundingClientRect();
      if (position - 140 < inputPosition.top) {
        const inputGroupWidth = window.getComputedStyle(inputGroup).width;
        inputGroup.style.position = "absolute";
        inputGroup.style.width = inputGroupWidth;
        inputGroup.style.top = inputPosition.top + "px";
        inputGroup.style.left = "50%";
        inputGroup.style.transform = "translate(-50%, 0%)";
      }
    } else {
      inputGroup.classList.remove("fix");
      inputGroup.style.position = "static";
      inputGroup.style.top = "auto";
      inputGroup.style.left = "auto";
      inputGroup.style.transform = "none";
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll); // очищення слухача при демонтуванні
      };
    }
  }, [location]);

  const handleScroll = () => {
    const position = window.scrollY;
    const inputPosition = document
      .querySelector(".home-inputPosition")
      .getBoundingClientRect();
    const inputGroup = document.querySelector(".header-input-group");
    const inputGroupWidth = window.getComputedStyle(inputGroup).width;
    
    if (
      position - 140 >= inputPosition.top &&
      inputGroup.style.position == "absolute"
    ) {
      inputGroup.classList.add("fix");
    }

    if (position - 140 >= inputPosition.top) {
      inputGroup.style.position = "static";
      inputGroup.style.top = "auto";
      inputGroup.style.left = "auto";
      inputGroup.style.transform = "none";
    } else {
      inputGroup.classList.remove("fix");
      inputGroup.style.position = "absolute";
      inputGroup.style.width = inputGroupWidth;
      inputGroup.style.top = inputPosition.top + "px";
      inputGroup.style.left = "50%";
      inputGroup.style.transform = "translate(-50%, 0%)";
    }
  };

  return (
    <header className="header">
      <img
        src="logo-header.svg"
        alt="logo"
        className="header-logo"
        onClick={() => {
          navigate("/");
        }}
      ></img>
      <div className="header-input-group">
        <button className="header-category">
          <p onClick={handleClick}>{filter}</p>
          <img
            src="/icons/arrow-down.svg"
            alt="likes"
            className="header-arrow"
            onClick={handleClick}
          ></img>
        </button>
        <input type="text" placeholder="" className="header-input" />
        <img
          src="/icons/search.svg"
          alt="search"
          className="header-search"
        ></img>
      </div>
      <div className="icons-block">
        <div>
          <img
            src="/icons/heart-white.svg"
            alt="likes"
            className="header-likes"
            onClick={() => {
              navigate("/favorite");
            }}
          ></img>
        </div>
        <div>
          <img
            src="/icons/cart.svg"
            alt="cart"
            className="header-cart"
            onClick={() => {
              navigate("/cart");
            }}
          ></img>
        </div>
        <div>
          <img
            src="/icons/profile.svg"
            alt="profile"
            className="header-profile"
          ></img>
        </div>
      </div>
      <Dropdown
        isOpen={isDropdownOpen}
        setOpen={setIsDropdownOpen}
        setFilter={setFilter}
      ></Dropdown>
    </header>
  );
}

export default Header;
