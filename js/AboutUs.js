$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
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
