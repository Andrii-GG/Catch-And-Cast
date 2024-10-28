import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Position from "./Position";
import { Link, useLocation, useNavigate } from "react-router-dom";

let category = [
  { name: "Вудилища", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Котушки", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Приманки", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Харчування", CategoryImageUrl: "/icons/bag.svg" },
  { name: "Гачки", CategoryImageUrl: "/icons/bag.svg" },
];

let items = [
  {
    id: 121212,
    name: "Вудка крута",
    price: 23999,
    rating: 5,
    description:
      "Ловить рибу. можна сісти на неї і полетіти в космос. Матеріал: залізо з венери та павутина павука.",
    imageUrl: "/example.png",
    favorite: true,
  },
  {
    id: 3223232,
    name: "Вудка не дуже",
    price: 599,
    rating: 1,
    description:
      "Не ловить рибу. можна гнати корову. Матеріал: дуб і нитка проста.",
    imageUrl: "/example.png",
    favorite: false,
  },
];

function HomePage() {
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [catalog, setCatalog] = useState("Популярні товари");
  const navigate = useNavigate();

  // const [displayedItems, setDisplayedItems] = useState([]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (items.length > displayedItems.length) {
  //       setDisplayedItems((prevItems) => [
  //         ...prevItems,
  //         items[prevItems.length],
  //       ]);
  //     }
  //   }, 100); // Затримка 1 секунда

  //   return () => clearTimeout(timer); // Очищення таймера
  // }, [displayedItems, items]); // Залежності

  function openPositionModal() {
    setIsPositionOpen(true);
  }

  useEffect(() => {
    localStorage.setItem("position", "Київ");
  }, []);

  useEffect(() => {
    const path = [window.location.pathname];
    localStorage.setItem("history", JSON.stringify(path));
  }, [window.location.pathname]);

  const shareButton = (e) => {
    const shareNotice = document.querySelector(".share-notice");
    shareNotice.style.display = "block";
    const buttonRect = e.target.getBoundingClientRect();

    shareNotice.style.top = buttonRect.top + window.scrollY + "px"; // Відступ від кнопки
    shareNotice.style.left = buttonRect.left - 90 + "px"; // Відступ зліва

    const itemId = e.target.closest(".item-block").id;
    const fullUrl = window.location.href + itemId;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        console.log("Адреса скопійована: ", fullUrl);
      })
      .catch((err) => {
        console.error("Помилка копіювання: ", err);
      });

    setTimeout(() => {
      shareNotice.style.display = "none";
    }, 2000);
  };

  function goToItem(item) {
    navigate(`/${item.id}`);
    const path = window.location.pathname;
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(path);
    localStorage.setItem("history", JSON.stringify(history));
  }

  return (
    <div className="homePage">
    <section className="home-block">
    <img
        src="logo-header.svg"
        alt="logo"
        className="header-logo"
        onClick={() => {
          navigate("/");
        }}
      ></img>
      <div className="home-inputPosition"></div>
    </section>
      <section className="catalog-block">
        <div className="catalog-title">
          <img
            src="/icons/catalog.svg"
            alt="catalog"
            className="catalogIcon"
          ></img>
          <span
            onClick={() => {
              setCatalog("Популярні товари");
            }}
          >
            Каталог
          </span>
          <div className="positionIcon-block" onClick={openPositionModal}>
            <img
              src="/icons/position.svg"
              alt="catalog"
              className="positionIcon"
            ></img>
          </div>
        </div>
        <div className="catalog-items">
          <ul>
            {category.map((item) => {
              return (
                <li
                  className="category-item"
                  key={item.name}
                  onClick={() => {
                    setCatalog(item.name);
                  }}
                >
                  <img src={item.CategoryImageUrl} alt={item.name}></img>
                  <span> {item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <nav className="breadcrumbs breadcrumbs-block">
        <ul>
          <li
            onClick={() => {
              setCatalog("Популярні товари");
            }}
          >
            <span className="breadcrumbs-title">Головна сторінка</span>
          </li>
          <li>
            <span>/</span>
            <span className="breadcrumbs-title">{catalog}</span>
          </li>
        </ul>
      </nav>
      <section className="items-container">
        {items.map((item) => {
          return (
            <div className="item-block" key={item.id} id={item.id}>
              <img
                alt={item.name}
                src={item.imageUrl}
                className="item-img"
                onClick={() => {
                  goToItem(item);
                }}
              ></img>
              <div className="item-heart-icon">
                <img
                  src={`/icons/heart-${
                    item.favorite ? "black-filled" : "black"
                  }.svg`}
                  className="icon-w-30 "
                ></img>
              </div>
              <div className="item-share-icon">
                <img
                  src="/icons/share.svg"
                  className="icon-w-30 "
                  onClick={shareButton}
                ></img>
              </div>
              <span
                className="item-title"
                onClick={() => {
                  goToItem(item);
                }}
              >
                {item.name}
              </span>
              <span className="item-description">
                {item.description} <br></br>
                <img
                  src={`/icons/rating-${item.rating}.svg`}
                  className="item-rating-icon"
                ></img>
              </span>
              <span className="item-price">
                {item.price.toLocaleString()} грн
              </span>
              <span className="item-vertical"></span>
              <span className="item-horizontal"></span>
              <button className="buy-button">
                <img src="icons/bag.svg"></img>
                <span>Купити</span>
              </button>
              <button className="cart-button">
                <img src="icons/cart-black.svg"></img>
                <span>У корзину</span>
              </button>
            </div>
          );
        })}
      </section>
      <Position isOpen={isPositionOpen} setOpen={setIsPositionOpen}></Position>
      <span className="share-notice">Посилання на товар скопійоване!</span>
    </div>
  );
}

export default HomePage;
