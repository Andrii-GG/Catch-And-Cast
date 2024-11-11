import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Position from "./Position";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useFetch from "./useFetch";
import { deleteFromFavorite } from "./deleteFromFavorite";
import { addToFavorite } from "./addToFavorite";
import { ApiUrl } from "./apiUrl";

function HomePage() {
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [catalog, setCatalog] = useState("Популярні товари");
  const navigate = useNavigate();
  const {
    data: items,
    loading,
    error,
  } = useFetch(`${ApiUrl}/api/product`);
  const { data: category } = useFetch(`${ApiUrl}/api/category`);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/favorite`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          const favoriteId = result.map((fav) => fav.productId);
          setFavoriteItems(favoriteId);
        }
      } catch (error) {
        console.error("Failed to fetch favorite items:", error);
      }
    };
    fetchData();
  }, []);

  function openPositionModal() {
    setIsPositionOpen(true);
  }

  const handleFavoriteToggle = (id, isFavorite) => {
    if (isFavorite) {
      setFavoriteItems((prevFavorites) =>
        prevFavorites.filter((favId) => favId !== id)
      );
      deleteFromFavorite(id);
    } else {
      setFavoriteItems((prevFavorites) => [...prevFavorites, id]);
      addToFavorite(id);
    }
  };

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
            {category
              ? category.map((item) => {
                  return (
                    <li
                      className="category-item"
                      key={item.categoryName}
                      onClick={() => {
                        setCatalog(item.categoryName);
                      }}
                    >
                      <img
                        src={item.categoryImageUrl}
                        alt={item.categoryName}
                      ></img>
                      <span> {item.categoryName}</span>
                    </li>
                  );
                })
              : ""}
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
        {loading ? (
          <p style={{ margin: "0px 0px 32px 0px" }}>Завантаження...</p>
        ) : (
          ""
        )}
        {error ? (
          <p style={{ margin: "0px 0px 32px 0px" }}>Помилка: {error}</p>
        ) : (
          ""
        )}
        {items
          ? items.map((item) => {
              const isFavorite = favoriteItems.some(
                (favId) => favId === item.id
              );
              const findCategory =
                category && category.find((cat) => cat.id === item.categoryId);
              return (
                (catalog === "Популярні товари" ||
                  catalog === findCategory.categoryName) && (
                  <div className="item-block" key={item.id} id={item.id}>
                    <img
                      alt={item.productName}
                      src={item.productImageUrl}
                      className="item-img"
                      onClick={() => {
                        goToItem(item);
                      }}
                    ></img>
                    <div className="item-heart-icon">
                      <img
                        src={`/icons/heart-${
                          // item.favorite
                          isFavorite ? "black-filled" : "black"
                        }.svg`}
                        className="icon-w-30 "
                        onClick={() =>
                          handleFavoriteToggle(item.id, isFavorite)
                        }
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
                      {item.productName}
                    </span>
                    <span className="item-description">
                      {item.productDescription} <br></br>
                      <img
                        src={`/icons/rating-${item.rating}.svg`}
                        className="item-rating-icon"
                      ></img>
                    </span>
                    <span className="item-price">
                      {item.productPrice.toLocaleString()} грн
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
                )
              );
            })
          : null}
      </section>
      <Position isOpen={isPositionOpen} setOpen={setIsPositionOpen}></Position>
      <span className="share-notice">Посилання на товар скопійоване!</span>
    </div>
  );
}

export default HomePage;