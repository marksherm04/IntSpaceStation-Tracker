const apiSpaceStation = "https://api.wheretheiss.at/v1/satellites/25544";


async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getSpaceStationData() {
  const data = await fetchData(apiSpaceStation);
  const spaceStationData = {
      lat: data.latitude,
      lng: data.longitude,
      alt: data.altitude,
      vel: data.velocity
  };
  return spaceStationData;
}

function updateSpaceStationData(lat, lng, alt, vel) {
  document.getElementById("latitude").textContent = lat;
  document.getElementById("longitude").textContent = lng;
  document.getElementById("altitude").textContent = alt;
  document.getElementById("velocity").textContent = vel;
}

function updateSatellitePosition(coords, marker) {
  const newPosition = new google.maps.LatLng(coords.lat, coords.lng);
  marker.setPosition(newPosition);
}


function initMap() {  // Initialize and add the map
  const latLng = { lat: 40, lng: -86 }; // starting map location in Indiana

  updateSpaceStationData("Searching Latitude...", "Searching Longitude...", // Showing acquire stats prior to showing when satellite appears
        "Searching Altitude...", "Searching Velocity....");

  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: latLng,
    streetViewControl: false,
    mapTypeId: "hybrid"
  });

  const satelliteMarker = new google.maps.Marker({
    title: "Space Station",
    position: latLng,
    map: map,
    clickable: true,
    icon: {
      url: "NEED PNG OF SATELLITE",
      scaledSize: new google.maps.Size(40, 40)
    }
  });

  setInterval(() => {
    const promise = getSpaceStationData();
    promise.then(spaceStationData => {
      const coordinates = { lat: spaceStationData.lat, lng: spaceStationData.lng };
      map.setCenter(coordinates);
      updateSpaceStationData(spaceStationData.lat, spaceStationData.lng, spaceStationData.alt, spaceStationData.vel);
      updateSatellitePosition(coordinates, marker);
    });
  }, 2000);
  }

window.onload = () => initMap();