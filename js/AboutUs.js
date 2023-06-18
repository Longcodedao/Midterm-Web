// ------------- WORKING WITH OWL CAROUSSEL AND RESPONSIVE ----------------
if ($(window).width() <= 1100 && $(window).width() > 750) {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    item: 2,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
    },
  });
} else if ($(window).width() > 1100) {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
} else if ($(window).width() <= 750) {
  console.log("Helll");
  $(".owl-carousel").owlCarousel({
    center: true,
    item: 1,
    dots: false,
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      200: {
        items: 1,
      },
    },
  });
}

// -------------- WORKING WITH FIXED NAVBAR -------------------
//  ( CANT TURN TO NAVBAR BOOTSTRAP BECAUSE IT WILL CREATE A LOT OF CONFLICTS)-------------

var NavBar = document.getElementById("topnav");
var logo = document.getElementById("logo");
var navigate_options = document.getElementById("nav-option");
var sticky = NavBar.offsetTop;

if ($(window).width() > 960) {
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
}

// -------------- WORKING WITH HAMBURGER NAVBAR -------------------

$listNav = $("li.nav-opt");
console.log("Hello World");
$("#hamburger-icon").on("click", function () {
  var scrollPosition = $(window).scrollTop();
  localStorage.setItem("scrollPosition", scrollPosition);
  $listNav.slideToggle(200);
  var storedScrollPosition = localStorage.getItem("scrollPosition");
  $(window).scrollTop(storedScrollPosition);
  console.log($(window).scrollTop());
});

if ($("window").width() > 600) {
  $listNav.show();
}

// --working with keyframes--

const productWrapper = document.querySelector(".product-keyframe-wrapper");
const ourTeam = document.querySelector(".our-team");

// define a function that checks if the element is in view
function isElementInViewport(element) {
  const windowHeight = window.innerHeight;
  let elementTop = element.getBoundingClientRect().top;
  let elementVisible = 30;

  if (elementTop < windowHeight - elementVisible) {
    return true;
  }
}

// define a function that toggles the animation class based on the scroll position
function toggleAnimationClass() {
  if (isElementInViewport(productWrapper)) {
    productWrapper.classList.add("slideright");
  } else {
    productWrapper.classList.remove("slideright");
  }
  if (isElementInViewport(ourTeam)) {
    ourTeam.classList.add("slideleft");
  } else {
    ourTeam.classList.remove("slideleft");
  }
}

// add an event listener that calls the toggleAnimationClass function on scroll
window.addEventListener("scroll", toggleAnimationClass);

// --------------- JQUERY ANIMATE top to bottom scroll ------------------------------
$(document).ready(function () {
  // Scroll to bottom button
  $("#scrollToBottomBtn").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");

    return false;
  });

  // Scroll to top button
  $("#scrollToTopBtn").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("html").animate({ scrollTop: 0 }, "slow"); // Added this line
    return false;
  });

  // Show/hide the buttons based on scroll position
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var windowHeight = $(this).height();
    var documentHeight = $(document).height();

    if (scrollTop > windowHeight / 2) {
      $("#scrollToTopBtn").addClass("active");
    } else {
      $("#scrollToTopBtn").removeClass("active");
    }

    if (scrollTop + windowHeight < documentHeight - windowHeight / 2) {
      $("#scrollToBottomBtn").addClass("active");
    } else {
      $("#scrollToBottomBtn").removeClass("active");
    }
  });

  // Check initial scroll position to show/hide the buttons
  $(window).trigger("scroll");
});
