const home = document.querySelector(".home");
const stargate = document.querySelector(".stargate");
const signup = document.querySelector(".signup");
const login = document.querySelector(".login");
const potd = document.querySelector(".potd");
const dashboard = document.querySelector(".dashboard");
const searchForm = document.querySelector(".search-form");
const hamburgerToggle = document.querySelector(".hamburger");
const modelToggle = document.querySelector(".modelDropdownWrapper");

let currentUrl = window.location.href.toString().split("/").pop();

if (currentUrl == "") {
  // home
  home.classList.add("active");
} else if (currentUrl == "stargate") {
  stargate.classList.add("active");
} else if (currentUrl == "dashboard") {
  dashboard.classList.add("active");
} else if (currentUrl == "signup") {
  signup.classList.add("active");
} else if (currentUrl == "login") {
  login.classList.add("active");
} else if (currentUrl == "potd") {
  potd.classList.add("active");
}
// search db
function search_body(event) {
  event.preventDefault();
  let input = document.getElementById("body-term").value.trim().toLowerCase();
  let url = `/api/body/${input}`;
  console.log(url);
  const getPlanet = (url) => {
    window.location.href = url;
  };
  getPlanet(url);
}
// hide model dropdown on hamburger open

const hideModelDropdown = () => {
  // if (modelToggle.classList.contains("fade-in")){
  //   modelToggle.classList.remove("fade-in");
  // }
  // else {
  //   modelToggle.classList.add("fade-in");  }
  // bs invisible
  modelToggle.classList.toggle("invisible");
  // fade anim
  // if (hamburgerToggle.classList.contains("collapsed")){
  //   modelToggle.classList.remove("fade-out");
  //   modelToggle.classList.add("fade-in");
  // }
  // else {
  //   modelToggle.classList.remove("fade-in")
  //   modelToggle.classList.add("fade-out")
  // }
}


searchForm.addEventListener("submit", search_body);
hamburgerToggle.addEventListener("click", hideModelDropdown);
