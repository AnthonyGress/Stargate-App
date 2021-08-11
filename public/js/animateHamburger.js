const toggler = document.querySelector(".hamburger");

const handleAnimation = () => {
  toggler.classList.toggle("is-active");
};

toggler.addEventListener("click", handleAnimation);
