const getAPOD = async () => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
  );
  const imageData = await res.json();
};
