let map;

async function Initialize() {
  // The location of our business(its VNUK because i am homeless)
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 16.07115789911272, lng: 108.22023173908029 },
    zoom: 15,
  });
  const request = {
    // got the id by using reverse geolocation
    placeId: "ChIJvcaESTEYQjERy7hqJD8EOrU",
    fields: ["name", "formatted_address", "geometry"],
  };
  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: "VNUK or something ",
      });

      google.maps.event.addListener(marker, "click", () => {
        const content = document.createElement("div");
        const nameElement = document.createElement("h2");

        nameElement.textContent = place.name;
        nameElement.style.fontSize = "23px";
        nameElement.style.color = "green";
        nameElement.style.fontFamily = "Be Vietnam Pro";

        content.appendChild(nameElement);

        const placeIdElement = document.createElement("p");

        // sending funny text cuz im bored
        const placeDescription = document.createElement("p");
        placeDescription.textContent = "It's VNUK because I am homeless";
        placeDescription.style.color = "green";
        placeDescription.style.fontSize = "16px";
        placeDescription.style.fontFamily = "Be Vietnam Pro";
        placeDescription.style.marginTop = "6px";
        placeDescription.style.marginBottom = "4px";

        placeIdElement.textContent = place.place_id;
        content.appendChild(placeIdElement);
        content.appendChild(placeDescription);

        const placeAddressElement = document.createElement("p");

        placeAddressElement.textContent = place.formatted_address;
        placeAddressElement.style.fontSize = "16px";
        placeAddressElement.style.fontFamily = "Be Vietnam Pro";

        content.appendChild(placeAddressElement);
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    }
  });
}

window.onload = function () {
  Initialize();
};
