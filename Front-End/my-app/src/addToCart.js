import { ApiUrl } from "./apiUrl";
export const addToCart = (id) => {
  const fetchData = async () => {
    try {
      await fetch(`${ApiUrl}/api/cart`, {
        method: "POST",
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
