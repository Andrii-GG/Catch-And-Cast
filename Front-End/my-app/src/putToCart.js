import { ApiUrl } from "./apiUrl";

export const putToCart = (id, increment) => {
  const fetchData = async () => {
    try {
      fetch(`${ApiUrl}/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId: id, increment: increment }),
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  fetchData();
};
