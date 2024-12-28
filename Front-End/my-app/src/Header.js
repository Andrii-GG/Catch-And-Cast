import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { ApiUrl } from "./apiUrl";
import useFetch from "./useFetch";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData, setCartItemCount, setFilter } from "./store";

function Header() {
  const cartItemCount = useSelector((state) => state.cartItemCount);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: cart } = useFetch(`${ApiUrl}/api/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  useEffect(() => {
    dispatch(
      setCartItemCount(
        cart ? cart.reduce((count, item) => count + item.counterProducts, 0) : 0
      )
    );
  }, [cart]);

  useEffect(() => {
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      cartIcon.setAttribute(
        "data-count",
        cartItemCount > 0 ? cartItemCount : ""
      );
    }
  });

  function handleClick() {
    setIsDropdownOpen(!isDropdownOpen);
    document
      .querySelector(".header-arrow")
      .classList.toggle("header-arrow-active");
  }

  useEffect(() => {
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
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location]);

  useEffect(() => {
    if (!localStorage.getItem("position"))
      localStorage.setItem("position", "Київ"); //встановлення розташування за замовчуванням

    const fetchData = async () => {
      //оновлення токена
      try {
        const response = await fetch(`${ApiUrl}/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
        } else {
          const errorData = await response.json();
          console.error(
            "Error:",
            response.statusText,
            errorData.message || errorData
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (localStorage.getItem("refreshToken")) {
      fetchData();
      const intervalId = setInterval(fetchData, 1000000);
      return () => clearInterval(intervalId);
    }
  }, []);

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

  const handleSearch = () => {
    const searchString = document.querySelector(".header-input").value;
    dispatch(setFilter({ searchString: searchString }));
    const isOnlySpaces = (str) => str.trim() === "";

    if (location.pathname !== "/") navigate("/");

    if (!isOnlySpaces(searchString)) {
      dispatch(
        fetchSearchData(
          `${ApiUrl}/api/product/filter?${
            filter.categoryId !== 0 ? `CategoryId=${filter.categoryId}` : ""
          }&FilterString=${searchString}`
        )
      );
      const categoryTitle = document.querySelector(
        ".breadcrumbs-block > ul > li:nth-child(2) > span:nth-child(2)"
      );
      if (categoryTitle) categoryTitle.textContent = filter.categoryName;
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
          <p onClick={handleClick}>{filter.categoryName}</p>
          <img
            src="/icons/arrow-down.svg"
            alt="likes"
            className="header-arrow"
            onClick={handleClick}
          ></img>
        </button>
        <input
          type="text"
          placeholder=""
          className="header-input"
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearch();
          }}
        />
        <img
          src="/icons/search.svg"
          alt="search"
          className="header-search"
          onClick={() => {
            handleSearch();
          }}
        ></img>
      </div>
      <div className="icons-block">
        <div>
          <img
            src="/icons/heart-white.svg"
            alt="likes"
            className="header-likes"
            onClick={() => {
              localStorage.getItem("accessToken")
                ? navigate("/favorite")
                : navigate("/authorization");
            }}
          ></img>
        </div>
        <div className="cart-icon">
          <img
            src="/icons/cart.svg"
            alt="cart"
            className="header-cart"
            onClick={() => {
              localStorage.getItem("accessToken")
                ? navigate("/cart")
                : navigate("/authorization");
            }}
          ></img>
        </div>
        <div>
          <img
            src="/icons/profile.svg"
            alt="profile"
            className="header-profile"
            onClick={() => {
              localStorage.getItem("accessToken")
                ? alert("Марта зроби сторінку профілю")
                : navigate("/authorization");
            }}
          ></img>
        </div>
      </div>
      <Dropdown
        isOpen={isDropdownOpen}
        setOpen={setIsDropdownOpen}
        handleSearch={handleSearch}
      ></Dropdown>
    </header>
  );
}

export default Header;
