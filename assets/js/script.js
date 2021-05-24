var todayDate = moment();
var displayTodayDate = document.getElementById("today-date");

displayTodayDate.innerHTML = todayDate.format("LL");