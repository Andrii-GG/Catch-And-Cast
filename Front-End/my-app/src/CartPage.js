import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiUrl } from "./apiUrl";
import { deleteFromFavorite } from "./deleteFromFavorite";
import { deleteFromCart } from "./deleteFromCart.js";
import { putToCart } from "./putToCart.js";
import { addToFavorite } from "./addToFavorite";
import { useDispatch } from "react-redux";
import {
  decrementCartItemCount,
  incrementCartItemCount,
  incrementCartItemCountByAmount,
} from "./store/cartItemCountSlice.js";

function CartPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  useEffect(() => {
    setPrice(
      cartItems.reduce(
        (sum, item) => sum + item.productPrice * item.counterProducts,
        0
      )
    );
    if (price * 0.25 < discount) {
      setTotalPrice(price - price * 0.25);
    } else {
      setTotalPrice(price - discount);
    }
    const path = [window.location.pathname];
    localStorage.setItem("history", JSON.stringify(path));
  });

  function goToItem(item) {
    navigate(`/${item.id}`);
    const path = window.location.pathname;
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(path);
    localStorage.setItem("history", JSON.stringify(history));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/cart`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          const cartItemsArray = await Promise.all(
            result.map(async (cartItem) => {
              try {
                const responseItem = await fetch(
                  `${ApiUrl}/api/product/${cartItem.productId}`
                );
                if (responseItem.ok) {
                  const productDetail = await responseItem.json();
                  return {
                    ...productDetail,
                    counterProducts: cartItem.counterProducts,
                  };
                }
              } catch (error) {
                console.error("Failed to fetch product data:", error);
              }
              return null;
            })
          );
          const filteredCartItems = cartItemsArray.filter(
            (item) => item !== null
          );
          setCartItems(filteredCartItems);
        }
      } catch (error) {
        console.error("Failed to fetch favorite items:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cartPage">
      <nav className="breadcrumbs">
        <ul>
          <li>
            <img
              src="icons/house.svg"
              onClick={() => {
                navigate("/");
              }}
            ></img>
          </li>
          <li
            onClick={() => {
              navigate("/cartPage", { replace: false });
            }}
          >
            <span> / </span>
            <span className="breadcrumbs-title">Кошик</span>
          </li>
        </ul>
      </nav>
      <div className="cart-title">Мій кошик</div>
      {loading ? (
        <p style={{ margin: "32px 0px 0px 32px" }}>Завантаження...</p>
      ) : (
        ""
      )}
      <section className="cart-items">
        {cartItems &&
          cartItems.map((item) => {
            const isFavorite = favoriteItems.some((favId) => favId === item.id);
            return (
              <div className="cart-item" key={item.id}>
                <div
                  className="cart-item-imgContainer"
                  onClick={() => {
                    goToItem(item);
                  }}
                >
                  {" "}
                  <img
                    alt={item.productName}
                    src={item.productImageUrl}
                    className="cart-item-img"
                  ></img>
                </div>
                <span
                  className="cart-item-title"
                  onClick={() => {
                    goToItem(item);
                  }}
                >
                  {item.productName}
                </span>
                <span className="cart-item-description">
                  {item.productDescription}{" "}
                </span>
                <span className="cart-item-price">
                  {item.productPrice.toLocaleString()} грн{" "}
                </span>
                <div className="cart-item-count">
                  <div
                    className="cart-item-count-decrement"
                    onClick={() => {
                      setCartItems((prevCart) =>
                        prevCart
                          .map((cartItem) => {
                            if (cartItem.id === item.id) {
                              dispatch(decrementCartItemCount());
                              if (cartItem.counterProducts === 1) return null;
                              return {
                                ...cartItem,
                                counterProducts: cartItem.counterProducts - 1,
                              };
                            }
                            return cartItem;
                          })
                          .filter((cartItem) => cartItem !== null)
                      );
                      putToCart(item.id, false);
                    }}
                  >
                    -
                  </div>
                  <div className="cart-item-count-number">
                    {item.counterProducts}
                  </div>
                  <div
                    className="cart-item-count-increment"
                    onClick={() => {
                      setCartItems((prevCart) =>
                        prevCart.map((cartItem) => {
                          if (cartItem.id === item.id) {
                            dispatch(incrementCartItemCount());
                            return {
                              ...cartItem,
                              counterProducts: cartItem.counterProducts + 1,
                            };
                          }
                          return cartItem;
                        })
                      );
                      putToCart(item.id, true);
                    }}
                  >
                    +
                  </div>
                </div>
                <button
                  className="cart-item-favButton"
                  onClick={() => handleFavoriteToggle(item.id, isFavorite)}
                >
                  <img
                    src={`/icons/heart-${
                      isFavorite ? "black-filled" : "black"
                    }.svg`}
                    className="icon-w-30 "
                  ></img>
                  <span>У вибране</span>
                </button>
                <button
                  className="cart-item-removeButton"
                  onClick={() => {
                    setCartItems((prevCart) =>
                      prevCart.filter((cartItem) => cartItem.id !== item.id)
                    );
                    cartItems.map((cartItem) =>
                      cartItem.id === item.id
                        ? dispatch(
                            incrementCartItemCountByAmount(
                              -cartItem.counterProducts
                            )
                          )
                        : cartItem
                    );
                    deleteFromCart(item.id);
                  }}
                >
                  <img src="icons/bin.svg" alt="bin" />
                  <span>Видалити</span>
                </button>
                <span className="cart-control-horizontal"></span>
              </div>
            );
          })}
        {cartItems.length === 0 && !loading && (
          <div className="cart-empty">Пусто</div>
        )}
      </section>
      <section className="cart-control">
        <div className="cart-control-promoTitle">
          У вас є промокод для знижки?
        </div>
        <div className="cart-control-promoControl">
          <input type="text" placeholder="Введіть промокод"></input>
          <button
            onClick={() => {
              document.querySelector(".cart-control-promoControl input")
                .value === "THEBEST10"
                ? setDiscount(100)
                : setDiscount(0);
            }}
          >
            <img src="icons/arrow-right.svg"></img>
          </button>
        </div>
        <div className="cart-control-orderBlock">
          <span className="cart-control-orderLabel">Вартість замовлення:</span>
          <span className="cart-control-orderPrice">
            {price.toLocaleString()} грн
          </span>
          <span className="cart-control-orderLabel">Знижка:</span>
          <span className="cart-control-orderDiscount">
            {" "}
            {discount.toLocaleString()} грн
          </span>
          <hr></hr>
          <span className="cart-control-orderTotalLabel">Разом до оплати:</span>
          <span className="cart-control-orderTotalPrice">
            {totalPrice.toLocaleString()} грн
          </span>
          <button
            className={`cart-control-orderButton ${
              price == 0 ? "disabled" : ""
            }`}
          >
            Оформити замовлення
          </button>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
