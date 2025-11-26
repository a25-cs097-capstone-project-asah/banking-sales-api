const fetchMLData = async (URL) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(
        `ML API Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'FetchError') {
      throw new Error(`Network error: Unable to reach ML API at ${URL}`);
    }
    throw error;
  }
};

module.exports = fetchMLData;
