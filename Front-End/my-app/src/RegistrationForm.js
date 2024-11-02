import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInput = document.getElementsByName("email")[0];
    const passwordInput = document.getElementsByName("password")[0];
    const firstNameInput = document.getElementsByName("firstName")[0];
    const secondNameInput = document.getElementsByName("secondName")[0];
    const phoneNumberInput = document.getElementsByName("phoneNumber")[0];

    const showError = (input) => {
      input.classList.add("error");
      setTimeout(() => input.classList.remove("error"), 1000);
    };

    const displayErrors = (errors) => {
      const errorContainer = document.querySelector(".error-container");
      errorContainer.innerHTML = "";

      errors.forEach((error) => {
        const errorMessage = document.createElement("div");
        errorMessage.textContent = error.description;
        showError(passwordInput);
        errorContainer.appendChild(errorMessage);
      });
    };

    let hasError = false;

    if (!loginInput.value) {
      showError(loginInput);
      hasError = true;
    }

    if (!passwordInput.value) {
      showError(passwordInput);
      hasError = true;
    }

    if (!firstNameInput.value) {
      showError(firstNameInput);
      hasError = true;
    }

    if (!secondNameInput.value) {
      showError(secondNameInput);
      hasError = true;
    }

    if (!phoneNumberInput.value) {
      showError(phoneNumberInput);
      hasError = true;
    }

    if (hasError) {
      return;
    }
    const formData = new FormData(e.target);

    const formObject = {};
    formData.forEach((value, key) => (formObject[key] = value));

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      if (response.ok) {
        try {
          const responseAuth = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginInput.value,
              password: passwordInput.value,
            }),
          });

          if (responseAuth.ok) {
            const result = await responseAuth.json();
            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        displayErrors(errorData);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className="RegistrationForm">
      <form onSubmit={handleSubmit}>
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
          <span className="AuthorizationForm-title">Реєстрація</span>
          <img
            className="AuthorizationForm-cross"
            src="icons/cross-black.svg"
            onClick={() => {
              navigate(-1);
            }}
            alt=""
          ></img>
        </div>
        <div class="error-container"></div>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваш email"
          name="email"
          type="email"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementsByName("password")[0].focus();
            }
          }}
        ></input>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваш пароль"
          name="password"
          type="password"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementsByName("firstName")[0].focus();
            }
          }}
        ></input>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваш ім'я"
          name="firstName"
          type="text"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementsByName("secondName")[0].focus();
            }
          }}
        ></input>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваше прізвище"
          name="secondName"
          type="text"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementsByName("phoneNumber")[0].focus();
            }
          }}
        ></input>
        <input
          className="AuthorizationForm-input"
          placeholder="Введіть ваш номер телефону"
          name="phoneNumber"
          type="tel"
          pattern="[0-9]*"
          maxLength="15"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        ></input>
        <button className="AuthorizationForm-button" type="submit">
          Продовжити
        </button>
        <span className="AuthorizationForm-regText">
          Маєте акаунт?
          <a
            onClick={() => {
              navigate("/authorization");
            }}
          >
            {" "}
            Увійти
          </a>
        </span>
      </form>
    </div>
  );
};

export default RegistrationForm;
