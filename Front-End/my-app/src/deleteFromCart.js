import { ApiUrl } from "./apiUrl"

export const deleteFromCart = (id) => {
  const fetchData = async () => {
    try {
      fetch(`${ApiUrl}/api/cart/product-id`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId: id }),
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  fetchData();
};