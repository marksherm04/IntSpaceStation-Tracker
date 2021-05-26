const apiSpaceStation = "https://api.wheretheiss.at/v1/satellites/25544";
const todayDate = moment();
const displayTodayDate = document.getElementById("today-date");

displayTodayDate.innerHTML = todayDate.format("LL");


async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

async function getSpaceStationData() {
  const data = await fetchData(apiSpaceStation);
  const spaceStationData = {
      lat: data.latitude,
      lng: data.longitude,
      alt: data.altitude,
      vel: data.velocity
  }
  return spaceStationData;
};

function updateSpaceStationData(lat, lng, alt, vel) {
  document.getElementById("latitude").textContent = lat;
  document.getElementById("longitude").textContent = lng;
  document.getElementById("altitude").textContent = alt;
  document.getElementById("velocity").textContent = vel;
};

function updateSatellitePosition(coords, marker) {
  const newPosition = new google.maps.LatLng(coords.lat, coords.lng);
  marker.setPosition(newPosition);
};


function initMap() {  // Initialize and add the map
  const myLatLng = { lat: 40, lng: -86 }; // starting map location in Indiana
  const currentLatLng = { updateSatellitePosition };

  updateSpaceStationData("Searching Latitude...", "Searching Longitude...", // Showing acquire stats prior to showing when satellite appears
        "Searching Altitude...", "Searching Velocity....");

  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    mapTypeId: "hybrid",
    streetViewControl: false
});

  const satelliteMarker = new google.maps.Marker({
    position: myLatLng,
    map,
    icon: {
        url: "images/iss-emblem.png",
        scaledSize: new google.maps.Size(80, 80),
    },
});

  setInterval(() => {
    const promise = getSpaceStationData();
    promise.then(spaceStationData => {
      const coordinates = { lat: spaceStationData.lat, lng: spaceStationData.lng };
      map.setCenter(coordinates);
      updateSpaceStationData(spaceStationData.lat, spaceStationData.lng, spaceStationData.alt, spaceStationData.vel);
      updateSatellitePosition(coordinates, satelliteMarker);
    });
  },  2000);
};

window.onload = () => initMap();
// END GOOGLE MAPS TRACKER AND LAT/LNG TRACKER

//START QUIZ
//Code for the Quiz
document.addEventListener('DOMContentLoaded', (event) => {

  //Array of questions
  var questions = [
      {
          question: "Commonly used data types DO NOT include: ",
          choices: ["strings", "booleans", "alerts", "numbers"],
          answer: "alerts"
      },
      {
          question: "The condition in an if / else statement is enclosed within .",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: "parentheses"
      },
      {
          question: "Which of these is NOT used to loop?",
          choices: ["for", "while", "foreach", "sequence"],
          answer: "sequence"
      },
      {
          question: "which of these is not a way to save a variable?",
          choices: ["vet", "var", "let", "const"],
          answer: "vet"
      },
      {
          question: "JS date function starts in seconds to current day from what day in 1970?",
          choices: ["January 1", "December 31", "June 1", "April 23"],
          answer: "January 1"
      },
  ];

  //Additional Initial Variables
  const initialTime = 75;
  let time = 75;
  let score = 0;
  let qCount = 0;
  let timeset;
  let answers = document.querySelectorAll('#quizContent button');

  //Set the array and if local storage exists it will be populated into the array of records. 
  let recordsArray = [];
  //Retrieve the data if it exists, otherwise, keep the array empty
  (localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];

  //Function to more efficiently call elments
  let queryElement = (element) => {
      return document.querySelector(element);
  }

  //Function that hides all sections and then unhides the section that is needed
  let onlyDisplaySection = (element) => {
      let sections = document.querySelectorAll("#cardQuiz section");
      Array.from(sections).forEach((userItem) => {
          userItem.classList.add('hide');
      });
      queryElement(element).classList.remove('hide');
  }

  //Function that is called to reset the HTML display for the score
  let recordsHtmlReset = () => {
      queryElement('#highScores div').innerHTML = "";
      var i = 1;
      recordsArray.sort((a,b) => b.score - a.score);
      Array.from(recordsArray).forEach(check =>
      {
          var scores = document.createElement("div");
          scores.innerHTML = i + "." + check.initialRecord + "-" + check.score;
          queryElement('#highScores div').appendChild(scores);
          ++i;
      });
      i = 0;
      Array.from(answers).forEach(answer => {
          answer.classList.remove('disable');
      });
  }

  //Funtion to set the question data for the question-content section
  let setQuestionData = () => {
      queryElement('#quizContent p').innerHTML = questions[qCount].question;
      queryElement('#quizContent button:nth-of-type(1)').innerHTML = '1. ' + questions[qCount].choices[0];
      queryElement('#quizContent button:nth-of-type(2)').innerHTML = '2. ' + questions[qCount].choices[1];
      queryElement('#quizContent button:nth-of-type(3)').innerHTML = '3. ' + questions[qCount].choices[2];
      queryElement('#quizContent button:nth-of-type(4)').innerHTML = '4. ' + questions[qCount].choices[3];
  }

  //Function that changes the question and uses a parameter to control what text is displayed based on the question. It will also provide a response of whether the answers provided are correct or not
  let quizUpdate = (answerCopy) => {
      queryElement('#scoreProvider p').innerHTML = answerCopy;
      queryElement('#scoreProvider').classList.remove('invisible', scoreProvider());
      Array.from(answers).forEach(answer =>
          {
              answer.classList.add('disable');
          });

      //If all the question have been answered or the timer reaches 0 the quiz section is exited and the final score is diplayed
      setTimeout(() => {
          if (qCount === questions.length) {
              onlyDisplaySection("#finishedQuiz");
              time = 0;
              queryElement('#time').innerHTML = time;
          }
          else {
              setQuestionData();
              Array.from(answers).forEach(answer => {
              answer.classList.remove('disable');
              });
          }
      }, 1000);
  }

  //Function for time decrement during the quiz
  let myTimer = () => {
      if (time > 0) {
          time = time - 1;
          queryElement('#time').innerHTML = time;
      }
      else {
          clearInterval(clock);
          queryElement('#score').innerHTML = score;
          onlyDisplaySection("#finishedQuiz");
      }
  }

  //Quiz Start and Timer
  let clock;
      queryElement("#quizIntro button").addEventListener("click", (e) => {
      setQuestionData();
      onlyDisplaySection("#quizContent")
      clock = setInterval(myTimer, 1000);
  });

  let scoreProvider = () => {
      clearTimeout(timeset);
      timeset = setTimeout(() => {
          queryElement('#scoreProvider').classList.add('invisible');

      }, 1000);
  }
  
  //Quiz Answer Checking
  Array.from(answers).forEach(check => {
      check.addEventListener('click', function (event) {
          if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
              score = time;
              qCount = qCount + 1;
              quizUpdate("Correct");
          } 
          else {
              time = time - 10;
              qCount = qCount + 1;
              score = time;
              quizUpdate("Wrong");
          }
      });
  });

  //Score Submission

  //Displays error message if initials given do not meet requirements
  let errors = () => {
      clearTimeout(timeset);
      timeset = setTimeout(() => {
          queryElement('#errors').classList.add('invisible');
      }, 3000);
  }

  //Error handling for submiting high scores
  queryElement("#submit").addEventListener("click", () => {
      let initialsRecord = queryElement('#initials').value;
      if (initialsRecord === ''){
          queryElement('#errors p').innerHTML = "You need at least 1 character";
          queryElement('#errors').classList.remove('invisible', errors());
      }
      else if (initialsRecord.match(/[[A-Za-z]/) === null) {
          queryElement('#errors p').innerHTML = "Only letters for initials allowed.";
          queryElement('#errors').classList.remove('invisible', errors());
      }
      else if (initialsRecord.length > 5) {
          queryElement('#errors p').innerHTML = "Maximum of 5 characters allowed.";
          queryElement('#errors').classList.remove('invisible', errors());
      }
      else {
          //Sends value to current array for use now.
          recordsArray.push({
              "initialRecord": initialsRecord,
              "score": score
           });

          //Sends value to local storage for later use.
          localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
          queryElement('#highScores div').innerHTML = '';
          onlyDisplaySection("#highScores");
          recordsHtmlReset();
          queryElement("#initials").value = '';
      }
  });
  //High Score and Local Storage
  //Clears the highscores from the html, array, and local storage
  queryElement('#clearScores').addEventListener("click", () => {
      recordsArray = [];
      queryElement('#highScores div').innerHTML = "";
      localStorage.removeItem('recordsArray');
  });

  //Resets all quiz settings to the default so that the user can replay the quiz
  queryElement("#reset").addEventListener("click", () => {
      time = initialTime;
      score = 0;
      qCount = 0;
      onlyDisplaySection("#quizIntro");
  });

  //This part leaves the quiz to view the high scores in the case that the user does this before completing the quiz
  queryElement("#quizScores").addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(clock);
      queryElement('#time').innerHTML = 0;
      time = initialTime;
      score = 0;
      qCount = 0;
      onlyDisplaySection("#highScores");
      recordsHtmlReset();
  });


});

// modal begin
let modalBtn = document.getElementById("modal-btn")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function(){
  modal.style.display = "block"
}
closeBtn.onclick = function(){
  modal.style.display = "none"
}
window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
  }
}
// modal end