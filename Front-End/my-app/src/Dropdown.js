import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useFetch from "./useFetch";
import { ApiUrl } from "./apiUrl";
import { useDispatch } from "react-redux";
import { setFilter } from "./store";
import { useLocation } from "react-router-dom";

const Dropdown = ({ isOpen, setOpen, handleSearch }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: category } = useFetch(`${ApiUrl}/api/category`);

  useEffect(() => {
    const dropdownMenu = document.querySelector(".dropdown-wall");

    if (location !== "/") {
      dropdownMenu.style.top =
        document.querySelector(".header-category").getBoundingClientRect().top +
        40 +
        "px";
    }

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
      if (window.scrollY - 140 < inputPosition.top) {
        dropdownMenu.style.top = inputPosition.top + 40 + "px";
      } else {
        dropdownMenu.style.top =
          document.querySelector(".header-category").getBoundingClientRect()
            .top +
          40 +
          "px";
      }
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

  function handleClick(item) {
    dispatch(
      setFilter({
        categoryId: item.id,
        categoryName: item.categoryName,
      })
    );

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
              handleClick({
                id: "Всі товари",
                categoryId: 0,
              });
            }}
          >
            Всі товари
          </li>
          {category &&
            category.map((item) => (
              <li
                key={item.categoryName}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.categoryName}
              </li>
            ))}
        </ul>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Dropdown;
