"use strict";

window.onload = () => {
  hideCard();
  let mountainSearch = document.querySelector("#mountainSearch");

  //log the mountainsArray to the console (scripts/data/mountainData.js)
  initMountainDropdown();

  mountainSearch.addEventListener("change", displayMountainCard);
};

/* 
- This function will generate the dropdown menu for different mountains in the United States
*/
function initMountainDropdown() {
  //Get hold of <select> element
  let mountainSearch = document.querySelector("#mountainSearch");

  //First create the Default Option
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "--Select A Mountain--";
  defaultOption.value = "";
  mountainSearch.appendChild(defaultOption);

  //Insert all the mountains in the <select> element
  //Here we used forEach method, It can be achieved using regular for loop
  mountainsArray.forEach((mountain) => {
    let newOption = document.createElement("option");
    newOption.textContent = mountain.name;
    mountainSearch.appendChild(newOption);
  });
}

async function displayMountainCard() {
  //get hold of the <select> element
  let mountainSearch = document.querySelector("#mountainSearch");

  //user selected option
  let userSelectedMountain = mountainSearch.value;

  if (userSelectedMountain === "") {
    hideCard();
    return;
  }

  let selectedMountainArray = filterMountainData(
    userSelectedMountain,
    mountainsArray
  );

  //Get hold of all the Elements in the card
  let mountainImg = document.querySelector("#mountainImg");
  let mountainHeading = document.querySelector("#mountainHeading");
  let mountainDetails = document.querySelector("#mountainDetails");
  let mountainLatitude = document.querySelector("#mountainLatitude");
  let mountainLongitude = document.querySelector("#mountainLongitude");

  //Put all the information inside the card
  selectedMountainArray.forEach((mountain) => {
    mountainImg.src = `images/${mountain.img}`;
    mountainHeading.innerHTML = mountain.name;
    mountainDetails.innerHTML = mountain.desc;
    mountainLatitude.innerHTML = `<strong>Lat:</strong> ${mountain.coords.lat}`;
    mountainLongitude.innerHTML = `<strong>Lng:</strong> ${mountain.coords.lng}`;
  });
  showCard();

  //Code for Displaying sunrise and sunset
  //Get hold the elements for Sunrise and Sunset
  let sunriseTime = document.querySelector("#sunriseTime");
  let sunsetTime = document.querySelector("#sunsetTime");
  let selectedLat = selectedMountainArray[0].coords.lat;
  let selectedLng = selectedMountainArray[0].coords.lng;

  let objectApi = await getSunsetForMountain(
    `"${selectedLat}"`,
    `"${selectedLng}"`
  ).then((sunsetData) => {
    return sunsetData.results;
  });

  sunriseTime.innerHTML = `<strong>Sunrise Time(UTC): </strong>${objectApi.sunrise}`;
  sunsetTime.innerHTML = `<strong>Sunset Time(UTC): </strong>${objectApi.sunset}`;
  console.log(objectApi);
}

/* 
- This function will return the only mountain that matches with the userselection
*/
function filterMountainData(selectedMountain, mountainDatas) {
  let filteredMountain = [];
  mountainDatas.forEach((mountain) => {
    if (selectedMountain.toLowerCase() === mountain.name.toLowerCase()) {
      filteredMountain.push(mountain);
    }
  });
  return filteredMountain;
}

// this function will hide the element
function hideCard() {
  let mountainCard = document.querySelector("#mountainCard");
  mountainCard.style.display = "none";
}

//function that can "fetch" the sunset/sunrise times
async function getSunsetForMountain(lat, lng) {
  let response = await fetch(
    `http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  let data = await response.json();
  return data;
}

//Using the function to fetch the sunset/sunrise times for a specific mountain
/* getSunsetForMountain("44.320686", "-71.291742").then((sunsetData) => {
  console.log(sunsetData.results);
}); */

//This function will show an HTML element on the page
//Just pass it the id of the element you want to show
function showCard() {
  let el = document.querySelector("#mountainCard");
  el.style.display = "block";
}
