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
