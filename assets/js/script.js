// moment.js date displaying in header
const todayDate = moment();
const displayTodayDate = document.getElementById("today-date");
// Satellite API
const apiSatelliteURL = "https://api.wheretheiss.at/v1/satellites/25544"
const apiGoogleMaps = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAh3MAhVK8vAiE25mVZrwuB9XnqlS_rkoI&callback=initMap"



function locationSpeedData(latitude, longitude, altitude, velocity) {
document.getElementById("longitude").textContent = longitude;
document.getElementById("latitude").textContent = latitude;
document.getElementById("altitude").textContent = altitude;
document.getElementById("velocity").textContent = velocity;
};


// today's date in header
displayTodayDate.innerHTML = todayDate.format("LL");
