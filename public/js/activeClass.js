const home = document.querySelector(".home");
const stargate = document.querySelector(".stargate");
const signup = document.querySelector(".signup");
const login = document.querySelector(".login");
const potd = document.querySelector(".potd");

let currentUrl = window.location.href.toString().split("/").pop();

if (currentUrl == "") {
  // home
  home.classList.add("active");
} else if (currentUrl == "stargate") {
  stargate.classList.add("active");
} else if (currentUrl == "signup") {
  signup.classList.add("active");
} else if (currentUrl == "login") {
  login.classList.add("active");
} else if (currentUrl == "potd") {
  potd.classList.add("active");
}
