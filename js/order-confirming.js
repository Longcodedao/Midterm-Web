$(document).ready(function () {
  // ---------------- NAVBAR THINGY----------------------
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

  //   ---------------------------- GENERATE RANDOM AND UNIQUE KEY-----------------------------

  function generateRandomKey() {
    let keyLength = 10;
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";

    for (var i = 0; i < keyLength; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }

    return key;
  }

  // Get the order-key span element
  let orderKeySpan = $(".order-key");

  // Check if a key already exists in local storage
  let storedKey = localStorage.getItem("orderKey");
  if (storedKey) {
    // Use the existing key
    orderKeySpan.text(storedKey);
  } else {
    // Generate a new key and store it in local storage
    var newKey = generateRandomKey();
    localStorage.setItem("orderKey", newKey);
    orderKeySpan.text(newKey);
  }

  //   ------------------------ working with accordion --------------------------------

  $("#my-accordion").accordion({
    // do this so we can collapse the accordion with just one section, for the sake of having implemenented one jqueryui element
    collapsible: true,
    active: false,
  });
});
