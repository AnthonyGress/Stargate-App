const format_date = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

const checkVideo = (mediaType) => {
  let isVideo;
  mediaType === "video" ? (isVideo = true) : (isVideo = false);
  return isVideo;
};

module.exports = { format_date, checkVideo };
