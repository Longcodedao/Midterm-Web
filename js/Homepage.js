$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    lazyLoad: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1500,
    navigation: true,
    margin: 0,
    responsive: {
      0: {
        items: 1,
      },
    },
  });
});

var NavBar = document.getElementById("topnav");
var logo = document.getElementById("logo");
var navigate_options = document.getElementById("nav-option");
var sticky = NavBar.offsetTop;

$(window).scroll(function () {
  if ($(window).scrollTop() > sticky + 100) {
    NavBar.classList.add("sticky");
    logo.classList.add("white-background");
    navigate_options.classList.add("white-background");
  } else {
    NavBar.classList.remove("sticky");
    logo.classList.remove("white-background");
    navigate_options.classList.remove("white-background");
  }
});

$listNav = $("li.nav-opt");

const screenWidth = $(window).width();
console.log(screenWidth);

$("#hamburger-icon").on("click", function () {
  $listNav.toggle(200);
});

if ($("window").width() > 600) {
  $listNav.show();
}

const textReasons = document.querySelector(".text-reasons");
const advantagesFlexWrapper = document.querySelector(
  ".advantages-flex-wrapper"
);
const ourAdvantages = document.querySelector(".our-advantages");

// define a function that checks if the element is in view
function isElementInViewport(element) {
  const windowHeight = window.innerHeight;
  let elementTop = element.getBoundingClientRect().top;
  let elementVisible = 150;

  if (elementTop < windowHeight - elementVisible) {
    return true;
  }
}

// define a function that toggles the animation class based on the scroll position
function toggleAnimationClass() {
  if (isElementInViewport(textReasons)) {
    textReasons.classList.add("animate");
  } else {
    textReasons.classList.remove("animate");
  }
  if (isElementInViewport(ourAdvantages)) {
    advantagesFlexWrapper.classList.add("animate");
  } else {
    advantagesFlexWrapper.classList.remove("animate");
  }
}

// add an event listener that calls the toggleAnimationClass function on scroll
window.addEventListener("scroll", toggleAnimationClass);
