function Fetch(url, options = {}) {
  let data = null;
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      data = result;
    } catch (err) {
     console.log(err);
    } 
  };

  fetchData();

  return data;
}

export default Fetch;
