import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorizationForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const path = [window.location.pathname];
    localStorage.setItem("history", JSON.stringify(path));
  });

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedLogin = localStorage.getItem("savedLogin") || "";
    const savedPassword = localStorage.getItem("savedPassword") || "";

    setLogin(savedLogin);
    setPassword(savedPassword);
  }, []);

  const handleClick = async () => {
    const loginInput = document.getElementsByName("login")[0];
    const passwordInput = document.getElementsByName("password")[0];
    const tip = document.querySelector(".AuthorizationForm-tip");

    const showError = (input) => {
      tip.classList.add("show");
      if (input !== null) {
        input.classList.add("error");
        setTimeout(() => input.classList.remove("error"), 1000);
      }
    };

    if (!loginInput.value) {
      tip.textContent = "Ці поля обов’язкові до заповнення*";
      showError(loginInput);
    }
    if (!passwordInput.value) {
      tip.textContent = "Ці поля обов’язкові до заповнення*";
      showError(passwordInput);
    }
    if (!loginInput.value || !passwordInput.value) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInput.value,
          password: passwordInput.value,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        if (document.getElementsByName("remember")[0].checked) {
          localStorage.setItem("savedLogin", loginInput.value);
          localStorage.setItem("savedPassword", passwordInput.value);
        } else {
          localStorage.removeItem("savedLogin");
          localStorage.removeItem("savedPassword");
        }
        navigate("/");
      } else {
        tip.textContent = "Не правильний логін або пароль!";
        showError(passwordInput);
        showError(loginInput);
      }
    } catch (error) {
      tip.textContent = error;
      showError(passwordInput);
      showError(loginInput);
    }
  };

  return (
    <div className="AuthorizationForm">
      <form>
        <div className="AuthorizationForm-title-block">
          {" "}
          <img
            className="AuthorizationForm-logo"
            src="/AuthorizationForm-logo.svg"
            onClick={() => {
              navigate("/");
            }}
            alt=""
          ></img>
          <span className="AuthorizationForm-title">Вхід</span>
          <img
            className="AuthorizationForm-cross"
            src="icons/cross-black.svg"
            onClick={() => {
              navigate(-1);
            }}
            alt=""
          ></img>
        </div>
        <span className="AuthorizationForm-tip">
          Ці поля обов’язкові до заповнення*
        </span>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваш email"
          name="login"
          type="email"
          autoComplete="username"
          value={login}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementsByName("password")[0].focus();
            }
          }}
          onChange={(e) => setLogin(e.target.value)}
        ></input>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваш пароль"
          name="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick();
            }
          }}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div>
          {" "}
          <input type="checkbox" name="remember"></input>
          <label style={{ marginLeft: "5px", color: "#747474" }}>
            Запам'ятати дані для входу
          </label>
        </div>
        <button
          className="AuthorizationForm-button"
          type="button"
          onClick={handleClick}
        >
          Увійти
        </button>
        <span className="AuthorizationForm-regText">
          Не маєте акаунту?
          <a
            onClick={() => {
              navigate("/registration");
            }}
          >
            {" "}
            Зареєструйтесь
          </a>
        </span>
      </form>
    </div>
  );
};

export default AuthorizationForm;
