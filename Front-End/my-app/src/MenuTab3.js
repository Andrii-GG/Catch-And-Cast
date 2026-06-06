import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useFetch from "./useFetch";
import { ApiUrl } from "./apiUrl";

const MenuTab3 = ({ item }) => {
  const {
    data: review,
    loading,
    error,
  } = useFetch(`${ApiUrl}/api/review/product/${item.id}`);

  return (
    <div className="menuTab">
      <div className="menuTab3-block">
        {review &&
          review.map((reviewItem) => {
            return (
              <div className="menuTab3-item">
                <img
                  src={`/icons/rating-${reviewItem.rate}.svg`}
                  className="menuTab3-rating-icon"
                  alt={reviewItem.id}
                ></img>
                <span className="menuTab3-date">
                  {new Date(reviewItem?.addDate).toLocaleString()}
                </span>

                <span className="menuTab3-comment">{reviewItem.comment}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MenuTab3;
