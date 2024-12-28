import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Position from "./Position";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useFetch from "./useFetch";
import { deleteFromFavorite } from "./deleteFromFavorite";
import { addToFavorite } from "./addToFavorite";
import { addToCart } from "./addToCart";
import { ApiUrl } from "./apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData, incrementCartItemCount, setFilter } from "./store";

function HomePage() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const items = useSelector((state) => state.searchItems.data);
  const loading = useSelector((state) => state.searchItems.loading);
  const error = useSelector((state) => state.searchItems.error);

  const navigate = useNavigate();
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const { data: category } = useFetch(`${ApiUrl}/api/category`);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    dispatch(fetchSearchData(`${ApiUrl}/api/product`));
  }, []);

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
    if (!localStorage.getItem("accessToken")) {
      navigate("/authorization");
      return;
    }
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

  const handleAddToCart = (id) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/authorization");
      return;
    }
    dispatch(incrementCartItemCount());
    addToCart(id);
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
              dispatch(
                setFilter({ categoryName: "Всі товари", searchString: "" })
              );
              dispatch(fetchSearchData(`${ApiUrl}/api/product`));
              document.querySelector(
                ".breadcrumbs-block > ul > li:nth-child(2) > span:nth-child(2)"
              ).textContent = "Всі товари";
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
              ? category.map((category) => {
                  return (
                    <li
                      className="category-item"
                      key={category.categoryName}
                      onClick={() => {
                        dispatch(
                          setFilter({
                            categoryName: category.categoryName,
                            searchString: "",
                          })
                        );
                        document.querySelector(
                          ".breadcrumbs-block > ul > li:nth-child(2) > span:nth-child(2)"
                        ).textContent = category.categoryName;
                        dispatch(
                          fetchSearchData(
                            `${ApiUrl}/api/product/category-id?CategoryId=${category.id}`
                          )
                        );
                      }}
                    >
                      <img
                        src={category.categoryImageUrl}
                        alt={category.categoryName}
                      ></img>
                      <span> {category.categoryName}</span>
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
              dispatch(
                setFilter({ categoryName: "Всі товари", searchString: "" })
              );
              dispatch(fetchSearchData(`${ApiUrl}/api/product`));
            }}
          >
            <span className="breadcrumbs-title">Головна сторінка</span>
          </li>
          <li
            onClick={() => {
              dispatch(setFilter({ searchString: "" }));
              dispatch(
                fetchSearchData(
                  `${ApiUrl}/api/product${
                    filter.categoryId === 0
                      ? ""
                      : `/category-id?CategoryId=${filter.categoryId}`
                  }`
                )
              );
            }}
          >
            <span>/</span>
            <span className="breadcrumbs-title">Всі товари</span>
          </li>

          {filter.searchString && (
            <li>
              <span>/</span>
              <span className="breadcrumbs-title">{filter.searchString}</span>
            </li>
          )}
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
        {items && items.length > 0
          ? items.map((item) => {
              const isFavorite = favoriteItems.some(
                (favId) => favId === item.id
              );
              return (
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
                        isFavorite ? "black-filled" : "black"
                      }.svg`}
                      className="icon-w-30 "
                      onClick={() => handleFavoriteToggle(item.id, isFavorite)}
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
                  <button
                    className="cart-button"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <img src="icons/cart-black.svg"></img>
                    <span>У корзину</span>
                  </button>
                </div>
              );
            })
          : !loading && (
              <p style={{ margin: "0px 0px 32px", justifySelf: "center" }}>
                Товарів не знайдено
              </p>
            )}
      </section>
      <Position isOpen={isPositionOpen} setOpen={setIsPositionOpen}></Position>
      <span className="share-notice">Посилання на товар скопійоване!</span>
    </div>
  );
}

export default HomePage;
