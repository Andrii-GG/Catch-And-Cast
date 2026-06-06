import { ApiUrl } from "./apiUrl"

export const deleteFromFavorite = (id) => {
  const fetchData = async () => {
    try {
      fetch(`${ApiUrl}/api/favorite/product-id`, {
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