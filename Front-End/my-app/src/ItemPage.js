import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuTab1 from "./MenuTab1";
import MenuTab2 from "./MenuTab2";
import MenuTab3 from "./MenuTab3";

let item = {
  id: 121212,
  name: "Вудка крута",
  price: 23999,
  rating: 5,
  descriptionShort: "Ловить рибу. ",
  description:
    "Ловить рибу. можна сісти на неї і полетіти в космос. Матеріал: залізо з венери та павутина павука.",
  imageUrl: "/example.png",
  favorite: false,
  amount: 2,
  date: new Date(2007, 0, 4).toLocaleDateString(),
  characteristics: {
    material: ["Матеріал", "Залізо з Венери та павутина павука"],
    weight: ["Вага", "1.5 кг"],
    dimensions: ["Розміри", "150см x 10см x 10см"],
    manufacturer: ["Виробник", "Космічний Риболов"],
    warranty: ["Гарантія", "12 місяців"],
    countryOfOrigin: ["Країна виробництва", "Україна"],
  },
};

function ItemPage({ breadcrumbNameMap }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [pathnames, setPathnames] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    setPathnames(history);
  }, [window.location.pathname]);

  if (false) {
    return <div className="itemPage">Товар не знайдений</div>;
  }

  const shareButton = (e) => {
    const shareNotice = document.querySelector(".share-notice");
    shareNotice.style.display = "block";
    const buttonRect = e.target.getBoundingClientRect();

    shareNotice.style.top = buttonRect.top + window.scrollY + "px";
    shareNotice.style.left = buttonRect.left - 90 + "px";
    const fullUrl = window.location.href;

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
            debugger;
            let customName = breadcrumbNameMap[value];

            if (value == "/") {
              return null;
            }
            if (!customName) {
              customName = `${item.name || value}`;
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
        <div className="itemPage-main">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="itemPage-img"
          ></img>
          <span className="itemPage-title">{item.name}</span>
          <span className="itemPage-date">Товар додано: {item.date}</span>
          <img
            src={`/icons/rating-${item.rating}.svg`}
            className="itemPage-rating-icon"
          ></img>
          <span className="itemPage-item-amount">
            Залишилося: {item.amount} од.{" "}
          </span>
          <span className="itemPage-price">
            Ціна: {item.price.toLocaleString()} грн
          </span>
          <div className="itemPage-icons">
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
          </div>
          <div className="itemPage-buttonBlock">
            <button className="itemPage-buyButton">
              <img src="icons/bag.svg" alt="heart" />
              <span>Купити</span>
            </button>
            <button className="itemPage-cartButton">
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
      </section>
      <span className="share-notice">Посилання на товар скопійоване!</span>
    </div>
  );
}

export default ItemPage;
