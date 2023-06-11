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

// -------------GENERATE RANDOM FUNKY COLOR FOR THE BUYING BUTTON------------------
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
  "#4a80b5",
  "#c44e3b",
  "#d5882a",
  "#d82767",
  "#fd79a8",
  "#8adb24",
  "#2327dc",
  "#21de96",
  "#c8d32c",
  ,
];

let buyingButtons = $(".buying-button");
let price = $(".price");
// using vanilla js cuz its the only way to do this
for (let i = 0; i < buyingButtons.length; i++) {
  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  price[i].style.color = randomColor;
  buyingButtons[i].style.backgroundColor = randomColor;
}
// --------------------- JQUERYUI ANIMATION ----------------------

$(document).ready(function () {
  console.log("Jqueryloaded");
});
