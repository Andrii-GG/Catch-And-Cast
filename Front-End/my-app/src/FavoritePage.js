import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteFromFavorite } from "./deleteFromFavorite";
import { ApiUrl } from "./apiUrl";

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
];

function FavoritePage() {
  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const path = [window.location.pathname];
    localStorage.setItem("history", JSON.stringify(path));
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

          const favoriteItemsArray = await Promise.all(
            result.map(async (fav) => {
              try {
                const responseItem = await fetch(
                  `http://localhost:5000/api/product/${fav.productId}`
                );
                if (responseItem.ok) {
                  const productDetail = await responseItem.json();
                  return productDetail;
                }
              } catch (error) {
                console.error("Failed to fetch product data:", error);
              }
              return null;
            })
          );
          const filteredFavoriteItems = favoriteItemsArray.filter(
            (item) => item !== null
          );
          setFavoriteItems(filteredFavoriteItems);
        }
      } catch (error) {
        console.error("Failed to fetch favorite items:", error);
      }
    };
    fetchData();
  }, []);

  function goToItem(item) {
    navigate(`/${item.id}`);
    const path = window.location.pathname;
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(path);
    localStorage.setItem("history", JSON.stringify(history));
  }

  const handleFavoriteDelete = (id) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id)
    );
    deleteFromFavorite(id);    
  };

  return (
    <div className="favoritePage">
      <nav className="breadcrumbs">
        <ul>
          <li>
            <Link to="/">
              <img src="icons/house.svg"></img>
            </Link>{" "}
          </li>
          <li
            onClick={() => {
              navigate("/favorite", { replace: false });
            }}
          >
            <span> / </span>
            <span className="breadcrumbs-title">Вибране</span>
          </li>
        </ul>
      </nav>
      <section className="favorite-title">Вибране</section>
      <section className="favorite-items-container">
        <div className="favorite-items-block">
          {favoriteItems.length != 0 &&
            favoriteItems.map((item) => (
              <div className="favorite-item" key={item.id} id={item.id}>
                <img
                  src={item.productImageUrl}
                  alt={item.productName}
                  onClick={() => {
                    goToItem(item);
                  }}
                />
                <span
                  className="favorite-item-title"
                  onClick={() => {
                    goToItem(item);
                  }}
                >
                  {item.productName}
                </span>
                <span className="favorite-item-description">
                  {item.productDescription}{" "}
                </span>
                <span className="favorite-item-price">
                  {item.productPrice.toLocaleString()} грн{" "}
                </span>
                <span className="favorite-item-amount">
                  Залишилося : {item.countRate} од.{" "}
                </span>
                <span className="favorite-item-horizontal"></span>
              </div>
            ))}
        </div>
        <div className="favorite-controls-block">
          {favoriteItems.length != 0 &&
            favoriteItems.map((item) => (
              <div className="favorite-control" key={item.id} id={item.id}>
                <button className="favorite-cart-button">
                  <img src="icons/cart-black.svg"></img>
                  <span>У кошик</span>
                </button>
                <button
                  className="favorite-remove-button"
                  onClick={() => {
                    handleFavoriteDelete(item.id);
                  }}
                >
                  <img src="icons/bin.svg"></img>
                  <span> Видалити зі списку</span>
                </button>
                <span className="favorite-control-horizontal"></span>
              </div>
            ))}
        </div>
        {favoriteItems.length == 0 && (
          <div className="favorite-empty">Пусто</div>
        )}
      </section>
    </div>
  );
}

export default FavoritePage;
