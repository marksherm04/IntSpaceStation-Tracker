// moment.js date displaying in header
const todayDate = moment();
const displayTodayDate = document.getElementById("today-date");
const apiSatelliteKey = 'https://api.wheretheiss.at/v1/satellites/25544';
const apiGoogleMapsKey = 'AIzaSyD_Crb9951lcxLTaWO_6ZB9Y-CsgUlnWOY';


async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


async function getSatelliteData() {
  const data = await fetchData(apiSatelliteKey);
  const satelliteData = {
      lat: data.latitude,
      lng: data.longitude,
      alt: data.altitude,
      vel: data.velocity
  };
  return satelliteData;
}

function updateSatelliteData(latitude, longitude, altitude, velocity) {
  document.getElementById('latitude').textContent = latitude;
  document.getElementById('longitude').textContent = longitude;
  document.getElementById('altitude').textContent = altitude;
  document.getElementById('velocity').textContent = velocity;
}

function updatePosition(coords, marker) {
  const newPosition = new google.maps.LatLng(coords.latitude, coords.longitude);
  marker.setPosition(newPosition);
}

// Initialize and add the map
function initMap() {
  // The location of IN, USA
  const usa = { lat: 40, lng: -86 };

  updateSatelliteData('Acquiring lattitude...', 'Acquiring longitude...',
        'Acquiring altitude...', 'Acquiring velocity...');

  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: usa,
    streetViewControl: false,
    mapTypeId: 'hybrid'
  });
  // The marker, positioned at IN, USA
  const marker = new google.maps.Marker({
    position: usa,
    map: map,
  });
}