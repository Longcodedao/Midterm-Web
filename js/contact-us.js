const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");

const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});
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

// const form = document.querySelector(".form");
// form.addEventListener("submit", (event) => {
//   event.preventDefault(); // prevent default form submission behavior
//   const modal = document.querySelector("#modal");
//   openModal(modal);
//   // Submit the form using JavaScript
//   // You can use Fetch or XMLHttpRequest to submit the form data to the server
//   fetch(form.action, {
//     method: form.method,
//     body: new FormData(form),
//   })
//     .then((response) => {
//       // handle response here, if necessary
//     })
//     .catch((error) => {
//       // handle error here, if necessary
//     });
// });

const form = document.querySelector(".form");
const submitButton = form.querySelector('input[type="submit"]');

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent the default form submission behavior

  const formData = new FormData(form); // get the form data

  const xhr = new XMLHttpRequest();
  xhr.open("POST", form.action);
  xhr.send(formData); // submit the form data asynchronously

  console.log({
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    information: formData.get("infor"),
  });

  const modal = document.querySelector(submitButton.dataset.modalTarget);
  openModal(modal); // open the modal

  form.reset(); // reset the form inputs
});
