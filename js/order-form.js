// -------------------- Working with NAVBAR -------------------------------
$(document).ready(function () {
  // var NavBar = document.getElementById("topnav");
  // var logo = document.getElementById("logo");
  // var navigate_options = document.getElementById("nav-option");
  // var sticky = NavBar.offsetTop;
  // if ($(window).width() > 960) {
  //     $(window).scroll(function () {
  //     if ($(window).scrollTop() > sticky + 100) {
  //         NavBar.classList.add("sticky");
  //         logo.classList.add("white-background");
  //         navigate_options.classList.add("white-background");
  //     } else {
  //     NavBar.classList.remove("sticky");
  //     logo.classList.remove("white-background");
  //     navigate_options.classList.remove("white-background");
  //     }
  // });
  // }
  // $listNav = $("li.nav-opt");
  // $("#hamburger-icon").on("click", function () {
  //     var scrollPosition = $(window).scrollTop();
  //     localStorage.setItem("scrollPosition", scrollPosition);
  //     $listNav.slideToggle(200);
  //     var storedScrollPosition = localStorage.getItem("scrollPosition");
  //     $(window).scrollTop(storedScrollPosition);
  //     console.log($(window).scrollTop());
  // });
  // if ($("window").width() > 600) {
  //     $listNav.show();
  // }
});

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
