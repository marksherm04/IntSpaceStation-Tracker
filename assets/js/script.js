var todayDate = moment();
var displayTodayDate = document.getElementById("today-date");

displayTodayDate.innerHTML = todayDate.format("LL");

// Satellite API "where is ISS at?" 
// https://api.wheretheiss.at/v1/coordinates/37.795517,-122.393693