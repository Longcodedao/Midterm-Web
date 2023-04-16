
// -----------------WORKING WITH KEYFRAMES----------------------

const furtherInfo = document.querySelector(".further-info");
const ourLocation = document.querySelector(".our-location");
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
  if (isElementInViewport(furtherInfo)) {
    furtherInfo.classList.add("animate");
  } else {
    furtherInfo.classList.remove("animate");
  }
  if (isElementInViewport(ourLocation)) {
    ourLocation.classList.add("animate");
  } else {
    ourLocation.classList.remove("animate");
  }
}

// add an event listener that calls the toggleAnimationClass function on scroll
window.addEventListener("scroll", toggleAnimationClass);





// Modal PopUp
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");

const overlay = document.getElementById("overlay");

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) {
    return;
  }

  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) {
    return;
  }

  modal.classList.remove("active");
  overlay.classList.remove("active");
}

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

const form = document.querySelector(".form");
const submitButton = form.querySelector('input[type="submit"]');

submitButton.addEventListener("click", function (e) {
  e.preventDefault(); // prevent the default form submission behavior

  const firstName = form.querySelector('input[name="first-name"]').value.trim();
  const lastName = form.querySelector('input[name="last-name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const phone = form.querySelector('input[name="phone"]').value.trim();
  const infor = form.querySelector('textarea[name="infor"]').value.trim();

  // Validate first name
  if (firstName === "") {
    alert("Please enter your first name.");
    return;
  }

  // Validate last name
  if (lastName === "") {
    alert("Please enter your last name.");
    return;
  }

  // Validate email
  if (email === "") {
    alert("Please enter your email address.");
    return;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    alert(
      "Please enter a valid email address (for example: imSoStupidIcantFillAnEmail@gmail.com)."
    );
    return;
  }

  // Validate phone number
  if (phone === "") {
    alert("Please enter your phone number.");
    return;
  } else if (!/^\d{10,11}$/.test(phone)) {
    alert("Please enter a valid 10 or 11-digit phone number.");
    return;
  }

  // Validate information
  if (infor === "") {
    alert("Please enter some information (So that we can make fun of you <3).");
    return;
  }

  // If all inputs are valid, submit the form
  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", form.action);
  xhr.send(formData); // submit the form data asynchronously

  console.log({
    firstName,
    lastName,
    email,
    phone,
    infor,
  });

  const modal = document.querySelector(submitButton.dataset.modalTarget);
  openModal(modal); // open the modal

  form.reset(); // reset the form inputs
});


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
