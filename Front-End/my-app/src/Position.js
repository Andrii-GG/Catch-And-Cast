import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Position = ({ isOpen, setOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState(localStorage.getItem("position"));
  const [filteredCities, setFilteredCities] = useState([]);

  const cities = [
    "Київ",
    "Харків",
    "Одеса",
    "Дніпро",
    "Львів",
    "Тернопіль",
    "Донецьк",
    "Запоріжжя",
    "Кривий Ріг",
    "Миколаїв",
    "Суми",
    "Полтава",
    "Чернівці",
    "Рівне",
    "Івано-Франківськ",
    "Хмельницький",
    "Житомир",
    "Луцьк",
    "Ужгород",
    "Бердянськ",
    "Черкаси",
    "Нікополь",
    "Біла Церква",
    "Славутич",
    "Кременчук",
    "Павлоград",
    "Лисичанськ",
    "Костянтинівка",
    "Бровари",
    "Мелітополь",
    "Дрогобич",
    "Червоноград",
    "Тульчин",
    "Умань",
    "Тисмениця",
    "Стрий",
    "Миргород",
    "Фастів",
    "Боярка",
    "Збараж",
    "Ізмаїл",
    "Бердичів",
    "Кам'янець-Подільський",
    "Переяслав",
    "Шепетівка",
    "Каховка",
    "Сімферополь",
    "Судак",
    "Ялта",
    "Алушта",
    "Євпаторія",
    "Феодосія",
    "Армянськ",
    "Керч",
    "Джанкой",
    "Красноперекопськ",
  ];

  useEffect(() => {
    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [inputValue]);

  if (!isOpen) return null;

  function closePositionModal() {
    setOpen(false);
  }

  const closePositionModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    const element = document.querySelector(".position-modal-list");

    if (element) {
      const firstChild = element.firstChild;
      if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
        firstChild.style.fontWeight = "bold"; // Change font weight only if
      }
    }
    if (event.key === "Enter") {
      const selectedCity = filteredCities[0];
      if (selectedCity) {
        localStorage.setItem("position", selectedCity);
        closePositionModal();
        setInputValue("");
      }
    }
  };

  return ReactDOM.createPortal(
    <div className="position-modal" onClick={closePositionModalOverlayClick}>
      <div className="position-modal-container">
        <span className="position-modal-title">
          Зараз вказано:{" "}
          <span style={{ fontWeight: "bold" }}>
            {localStorage.getItem("position")}
          </span>
        </span>
        <img
          src="icons/cross-white.svg"
          alt="close"
          onClick={closePositionModal}
        />
        <span className="position-modal-inputTitle">
          Щоб змінити населений пункт
        </span>
        <input
          type="text"
          className="position-modal-input"
          placeholder="Почніть вводити назву"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            const element = document.querySelector(".position-modal-list");
            if (element) {
              const firstChild = element.firstChild;
              if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
                firstChild.style.fontWeight = "bold";
              }
            }
          }}
          onBlur={() => {
            const element = document.querySelector(".position-modal-list");
            if (element) {
              const firstChild = element.firstChild;
              if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
                firstChild.style.fontWeight = "normal";
              }
            }
          }}
        />
        <span className="position-modal-listTitle">Або виберіть зі списку</span>
        <ul className="position-modal-list">
          {filteredCities.slice(0, 5).map((city, index) => (
            <li
              key={index}
              onClick={() => {
                localStorage.setItem("position", city);
                setCity(city);
                closePositionModal();
                setInputValue("");
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Position;
