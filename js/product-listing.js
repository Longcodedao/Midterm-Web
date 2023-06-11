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
