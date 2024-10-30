import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

let items = [
  {
    id: 121212,
    name: "Вудка крута",
    price: 23999,
    rating: 5,
    descriptionShort: "Ловить рибу. ",
    description:
      "Ловить рибу. можна сісти на неї і полетіти в космос. Матеріал: залізо з венери та павутина павука.",
    imageUrl: "/example.png",
    favorite: true,
    amount: 2,
  },
  {
    id: 3223232,
    name: "Вудка не дуже",
    price: 599,
    rating: 1,
    descriptionShort: "Не ловить рибу. ",
    description:
      "Не ловить рибу. можна гнати корову. Матеріал: дуб і нитка проста.",
    imageUrl: "/example.png",
    favorite: false,
    amount: 1,
  },
  {
    id: 3223232,
    name: "Вудка не дуже",
    price: 599,
    rating: 1,
    descriptionShort: "Не ловить рибу. ",
    description:
      "Не ловить рибу. можна гнати корову. Матеріал: дуб і нитка проста.",
    imageUrl: "/example.png",
    favorite: false,
    amount: 1,
  },
];

function CartPage() {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(items.reduce((sum, item) => sum + item.price, 0));
    window.scrollTo(0, 0);

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
      <section className="cart-items">
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.imageUrl}
              alt={item.name}
              onClick={() => {
                goToItem(item);
              }}
            />
            <span
              className="cart-item-title"
              onClick={() => {
                goToItem(item);
              }}
            >
              {item.name}
            </span>
            <span className="cart-item-description">
              {item.descriptionShort}{" "}
            </span>
            <span className="cart-item-price">
              {item.price.toLocaleString()} грн{" "}
            </span>
            <div className="cart-item-count">
              <div className="cart-item-count-decrement">-</div>
              <div className="cart-item-count-number">1</div>
              <div className="cart-item-count-increment">+</div>
            </div>
            <button className="cart-item-favButton">
              <img src="icons/heart-black.svg" alt="heart" />
              <span>У вибране</span>
            </button>
            <button className="cart-item-removeButton">
              <img src="icons/bin.svg" alt="bin" />
              <span>Видалити</span>
            </button>
            <span className="cart-control-horizontal"></span>
          </div>
        ))}
        {items.length == 0 && <div className="cart-empty">Пусто</div>}
      </section>
      <section className="cart-control">
        <div className="cart-control-promoTitle">
          У вас є промокод для знижки?
        </div>
        <div className="cart-control-promoControl">
          <input type="text" placeholder="Введіть промокод"></input>
          <button>
            <img src="icons/arrow-right.svg"></img>
          </button>
        </div>
        <div className="cart-control-orderBlock">
          <span className="cart-control-orderLabel">Вартість замовлення:</span>
          <span className="cart-control-orderPrice">
            {items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}{" "}
            грн
          </span>
          <span className="cart-control-orderLabel">Знижка:</span>
          <span className="cart-control-orderDiscount"> 0 грн</span>
          <hr></hr>
          <span className="cart-control-orderTotalLabel">Разом до оплати:</span>
          <span className="cart-control-orderTotalPrice">
            {price.toLocaleString()} грн
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
