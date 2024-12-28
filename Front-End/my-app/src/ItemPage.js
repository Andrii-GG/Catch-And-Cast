import { useState, useEffect } from "react";
import {
  Link,
  useFetcher,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useFetch from "./useFetch";
import MenuTab1 from "./MenuTab1";
import MenuTab2 from "./MenuTab2";
import MenuTab3 from "./MenuTab3";
import { deleteFromFavorite } from "./deleteFromFavorite";
import { addToFavorite } from "./addToFavorite";
import { ApiUrl } from "./apiUrl";
import { addToCart } from "./addToCart";
import { useDispatch, useSelector } from "react-redux";
import { incrementCartItemCount } from "./store";

function ItemPage() {
  const breadcrumbNameMap = useSelector((state) => state.breadcrumbNameMap);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { itemId } = useParams();
  const [activeTab, setActiveTab] = useState("tab1");
  const [pathnames, setPathnames] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: item,
    loading,
    error,
  } = useFetch(`${ApiUrl}/api/product/${itemId}`);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    setPathnames(history);
  }, [window.location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
          setIsFavorite(result.some((fav) => fav.productId == itemId));
        }
      } catch (error) {
        console.error("Failed to fetch favorite items:", error);
      }
    };
    fetchData();
  }, []);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      setIsFavorite(false);
      deleteFromFavorite(itemId);
    } else {
      setIsFavorite(true);
      addToFavorite(itemId);
    }
  };

  if (error) {
    return (
      <div className="itemPage" style={{ fontSize: "24px" }}>
        <div className="invalidPage">
          <span className="invalidPage-error">Помилка 404</span>
          <span className="invalidPage-notFound">Сторінку не знайдено</span>
          <span className="invalidPage-notFoundTip">
            Неправильно набрано адресу або такої сторінки на сайті більше не
            існує.
          </span>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Перейти на головну сторінку
          </button>
        </div>
      </div>
    );
  }

  const shareButton = (e) => {
    const shareNotice = document.querySelector(".share-notice");
    shareNotice.style.display = "block";
    const buttonRect = e.target.getBoundingClientRect();

    shareNotice.style.top = buttonRect.top + window.scrollY + "px";
    shareNotice.style.left = buttonRect.left - 90 + "px";
    const fullUrl = window.location.href;

    navigator.clipboard.writeText(fullUrl);

    setTimeout(() => {
      shareNotice.style.display = "none";
    }, 2000);
  };

  const handleAddToCart = (id) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/authorization");
      return;
    }
    dispatch(incrementCartItemCount());
    addToCart(id);
  };

  return (
    <div className="itemPage">
      <nav className="breadcrumbs">
        <ul>
          <li>
            <Link to="/">
              <img src="icons/house.svg"></img>
            </Link>{" "}
          </li>
          {pathnames.map((value, index) => {
            let customName = breadcrumbNameMap[value];

            if (value == "/") {
              return null;
            }
            if (!customName) {
              customName = `${item?.productName || value}`;
            }
            return (
              <li
                key={value}
                onClick={() => {
                  navigate(value);
                }}
              >
                <span> / </span>
                <span className="breadcrumbs-title">{customName || value}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      <section className="itemPage-container">
        {loading ? (
          <p style={{ margin: "0px 0px 32px 0px" }}>Завантаження...</p>
        ) : (
          ""
        )}{" "}
        <>
          <div className="itemPage-main">
            <img
              src={item?.productImageUrl}
              alt={item?.productName}
              className="itemPage-img"
            ></img>
            <span className="itemPage-title">{item?.productName}</span>
            <span className="itemPage-date">
              Товар додано: {new Date(item?.createdAt).toLocaleString()}
            </span>
            <img
              src={`/icons/rating-${item?.rating}.svg`}
              className="itemPage-rating-icon"
              alt="item.productName"
            ></img>
            <span className="itemPage-item-amount">
              Залишилося: {item?.countRate} од.{" "}
            </span>
            <span className="itemPage-price">
              Ціна: {item?.productPrice.toLocaleString()} грн
            </span>
            <div className="itemPage-icons">
              <div className="item-heart-icon">
                <img
                  src={`/icons/heart-${
                    isFavorite ? "black-filled" : "black"
                  }.svg`}
                  className="icon-w-30 "
                  alt="icons/heart"
                  onClick={handleFavoriteToggle}
                ></img>
              </div>
              <div className="item-share-icon">
                <img
                  src="/icons/share.svg"
                  className="icon-w-30 "
                  onClick={shareButton}
                  alt="icons/share"
                ></img>
              </div>
            </div>
            <div className="itemPage-buttonBlock">
              <button className="itemPage-buyButton">
                <img src="icons/bag.svg" alt="heart" />
                <span>Купити</span>
              </button>
              <button
                className="itemPage-cartButton"
                onClick={() => handleAddToCart(item.id)}
              >
                <img src="icons/cart-black.svg" alt="bin" />
                <span>У кошик</span>
              </button>
            </div>
          </div>
          <div className="itemPage-info">
            <span className="itemPage-horizontal"></span>
            <ul className="itemPage-menu">
              <li
                className={activeTab === "tab1" ? "active-tab" : ""}
                onClick={() => setActiveTab("tab1")}
              >
                Опис
              </li>
              <li
                className={activeTab === "tab2" ? "active-tab" : ""}
                onClick={() => setActiveTab("tab2")}
              >
                Характеристики
              </li>
              <li
                className={activeTab === "tab3" ? "active-tab" : ""}
                onClick={() => setActiveTab("tab3")}
              >
                Відгуки
              </li>
            </ul>
            <span className="itemPage-horizontal"></span>
            <div className="itemPage-menu-info">
              {activeTab === "tab1" && <MenuTab1 item={item}></MenuTab1>}
              {activeTab === "tab2" && <MenuTab2 item={item}></MenuTab2>}
              {activeTab === "tab3" && <MenuTab3 item={item}></MenuTab3>}
            </div>
          </div>
        </>
      </section>
      <span className="share-notice">Посилання на товар скопійоване!</span>
    </div>
  );
}

export default ItemPage;
