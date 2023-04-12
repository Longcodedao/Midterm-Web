$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        lazyLoad: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1500,
        navigation: true,
        margin: 0,
        responsive: {
            0: {
                items: 1
            }
        }
    })
})

var NavBar = document.getElementById("topnav")
var logo = document.getElementById("logo")
var navigate_options = document.getElementById("nav-option")
var sticky = NavBar.offsetTop

$(window).scroll(function() {
    if ($(window).scrollTop() > (sticky + 100) ) {
        NavBar.classList.add("sticky")
        logo.classList.add("white-background")
        navigate_options.classList.add("white-background")
    }else {
        NavBar.classList.remove("sticky")
        logo.classList.remove("white-background")
        navigate_options.classList.remove("white-background")
    }
})


$listNav = $("li.nav-opt")

const screenWidth = $(window).width();
console.log(screenWidth);

$("#hamburger-icon").on('click', function() {
    $listNav.toggle(200);
})
