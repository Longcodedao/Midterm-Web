// ------------- WORKING WITH FIXED NAVBAR -------------------

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

$listNav = $("li.nav-opt");

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

// -------------GENERATE RANDOM FUNKY COLOR FOR THE BUYING BUTTON and price------------------

var colors = [
  "#2c3e50",
  "#d42b6a",
  "#43bc8d",
  "#60b748",
  "#2aced5",
  "#3c81c3",
  "#f39c12",
  "#4b3bc4",
  "#7822dd",
  "#b21ce3",
  "#ca35b6",
  "#c1673e",
  "#62d12e",
  "#c44e3b",
  "#d5882a",
  "#fd79a8",
  "#8adb24",
  "#2327dc",
  "#21de96",
  "#c8d32c",
  "#e4af1d",
  "#631de4",
  "#e45c1d",
  "#684b96",
  "#4c4ec9",
  "#3bbb94",
  "#17ac1e",
  "#9dbb16",
  "#cac036",
];

let buyingButtons = $(".buying-button");
let prices = $(".card-subtitle");
let usedColors = [];

for (let i = 0; i < buyingButtons.length; i++) {
  let randomColor;

  // Generate a unique random color
  do {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  } while (usedColors.includes(randomColor)); // the used colors overlaps with the random color, we do another loop

  // add the color to the usedColors array
  usedColors.push(randomColor);

  $(prices[i]).css("color", randomColor);
  $(buyingButtons[i]).css("background-color", randomColor);
}

// --------------------- JQUERYUI ANIMATION ----------------------
