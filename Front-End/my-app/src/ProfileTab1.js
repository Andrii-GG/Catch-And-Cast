import React, { useState, useEffect, useRef } from "react";
import useFetch from "./useFetch";
import { ApiUrl } from "./apiUrl";

const ProfileTab1 = () => {
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
  useEffect(() => {
    console.log(user);
  });

  return (
    <div className="profileTab">
      {user && (
        <div className="profileTab1-container">
          <img src="/avatar.png" className="profileTab1-avatar"></img>
          <span className="profileTab1-name">
            {user.firstName
              ? user.firstName + " " + user.secondName
              : user.userName}
          </span>
          {user.phoneNumber && (
            <span className="profileTab1-number">{user.phoneNumber}</span>
          )}
          <span className="profileTab1-data">
            Акаунт створено: {new Date(user.createdAt).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileTab1;
