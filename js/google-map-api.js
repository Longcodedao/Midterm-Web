let map;

async function Initialize() {
  // The location of our business(its VNUK because i am homeless)

  const position = { lat: 16.071137280035177, lng: 108.2202210102441 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  // The map, centered at VNUK
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
  });

  // The marker, positioned at VNUK

  const marker = new google.maps.Marker({
    map: map,
    position: position,
    title: "VNUK or something idk",
  });
}

window.onload = function () {
  Initialize();
};
