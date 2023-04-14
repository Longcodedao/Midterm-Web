const sr = ScrollReveal({
  distance: "65px",
  duration: 2600,
  delay: 450,
  reset: true,
});

sr.reveal(".Contactinfo", { delay: 200, origin: "bottom" });
sr.reveal(".ContactInput", { delay: 200, origin: "bottom" });

let map;
let infoWindow = new google.maps.InfoWindow();

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  let ourPlace = { lat: 16.07109753993075, lng: 108.22024833862913 };
  map = new Map(document.getElementById("map"), {
    center: { lat: 16.071044494159715, lng: 108.22024246791646 },
    zoom: 10,
    center: ourPlace,
  });

  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Current Location";
  locationButton.classList.add("custom-map-control-button");

  let marker = new google.maps.Marker({
    position: ourPlace,
    map: map,
    title: "OUR PLACE, HALLELUJAH",
  });
}

initMap();

function validateForm() {
  var name = document.forms["contactForm"]["name"].value;
  var email = document.forms["contactForm"]["email"].value;
  var subject = document.forms["contactForm"]["subject"].value;
  var message = document.forms["contactForm"]["message"].value;
  var error = false;

  if (name == "") {
    alert("Vui lòng nhập họ và tên của bạn!");
    document.forms["contactForm"]["name"].classList.add("error");
    error = true;
  } else {
    document.forms["contactForm"]["name"].classList.remove("error");
  }

  if (email == "") {
    alert("Vui lòng nhập địa chỉ email của bạn!");
    document.forms["contactForm"]["email"].classList.add("error");
    error = true;
  } else {
    // Kiểm tra định dạng email hợp lệ
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Địa chỉ email không hợp lệ!");
      document.forms["contactForm"]["email"].classList.add("error");
      error = true;
    } else {
      document.forms["contactForm"]["email"].classList.remove("error");
    }
  }

  if (subject == "") {
    alert("Vui lòng nhập tiêu đề!");
    document.forms["contactForm"]["subject"].classList.add("error");
    error = true;
  } else {
    document.forms["contactForm"]["subject"].classList.remove("error");
  }

  if (message == "") {
    alert("Vui lòng nhập nội dung tin nhắn!");
    document.forms["contactForm"]["message"].classList.add("error");
    error = true;
  } else {
    document.forms["contactForm"]["message"].classList.remove("error");
  }

  if (error) {
    return false;
  }

  alert("Cảm ơn bạn đã liên hệ với chúng tôi!");
  return true;
}