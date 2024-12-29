import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { ApiUrl } from "./apiUrl";

const ProfileTab3 = () => {
  const {
    data: user,
    loading,
    error,
  } = useFetch(`${ApiUrl}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName || "");
      setSecondName(user?.secondName || "");
      setPhoneNumber(user?.phoneNumber || "");
    }
  }, [user]);

  const showError = (input) => {
    if (input !== null) {
      input.classList.add("error");
      setTimeout(() => input.classList.remove("error"), 1000);
    }
  };

  const handleUpdateField = async (field, value) => {
    try {
      const response = await fetch(`${ApiUrl}/api/user/${field}`, {
        method: field === "reset" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(value),
      });
      if (response.ok) {
        if (field === "reset") {
          console.log(document.getElementsByName("password"));
          document.getElementsByName("password")[0].value = "";
          document.getElementsByName("password")[1].value = "";
        }
        console.log(`${field} updated successfully`);
      } else {
        if (field === "reset") {
          showError(document.getElementsByName("password")[0]);
          showError(document.getElementsByName("password")[1]);
        } else console.error(`Failed to update ${field}`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div className="profileTab">
      {user && (
        <div className="profileTab3-container">
          <div className="profileTab3-title">Змінити особисті дані</div>
          <div className="profileTab3-firstName">
            <input
              placeholder="Введіть ваше ім'я"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <button
              onClick={() => {
                handleUpdateField("first-name", { firstName: firstName });
              }}
            >
              Змінити
            </button>
          </div>
          <div className="profileTab3-secondName">
            <input
              placeholder="Введіть ваше прізвище"
              name="secondName"
              type="text"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
            />
            <button
              onClick={() => {
                handleUpdateField("second-name", { secondName: secondName });
              }}
            >
              Змінити
            </button>
          </div>
          <div className="profileTab3-phoneNumber">
            <input
              placeholder="Введіть ваш номер телефону"
              name="phoneNumber"
              type="tel"
              pattern="[0-9]*"
              maxLength="15"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              onClick={() => {
                handleUpdateField("phone-number", { phoneNumber: phoneNumber });
              }}
            >
              Змінити
            </button>
          </div>
          <div className="profileTab3-title">Змінити пароль</div>
          <div className="profileTab3-password">
            <input
              placeholder="Введіть ваш новий пароль"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Повторно введіть ваш новий пароль"
              name="password"
              type="password"
            />
            <button
              onClick={(e) => {
                if (
                  document.getElementsByName("password")[1].value !== password
                ) {
                  showError(document.getElementsByName("password")[0]);
                  showError(document.getElementsByName("password")[1]);
                } else {
                  handleUpdateField("reset", {
                    email: user.email,
                    newPassword: password,
                  });
                }
              }}
            >
              Змінити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab3;
