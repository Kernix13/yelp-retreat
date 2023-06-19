const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
let rootElement = document.documentElement;
let TOGGLE_RATIO = 0.05;

function handleScroll() {
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if ((rootElement.scrollTop / scrollTotal) > TOGGLE_RATIO) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);