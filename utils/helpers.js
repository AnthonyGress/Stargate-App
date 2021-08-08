const format_date = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

const checkLocation = (comparator) => {
  let currentUrl = window.location.href.toString().split("/").pop();
  let result;
  console.log(currentUrl);
  currentUrl == comparator ? (result = true) : (result = false);
  return result;
};

module.exports = { format_date, checkLocation };
