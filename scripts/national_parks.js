"use strict";

window.onload = () => {
  hideElement("#searchByLocation");
  hideElement("#searchByParkType");
  initLocationDropdown();
  initParkTypeDropdown();

  //Get hold of Radio buttons

  //Get hold of select
  let searchByLocation = document.querySelector("#searchByLocation");
  let searchByParkType = document.querySelector("#searchByParkType");
  let radioByLocation = document.querySelector("#byLocation");
  let radioByType = document.querySelector("#byType");

  searchByLocation.addEventListener("change", displayResultByLocation);
  searchByParkType.addEventListener("change", displayResultByParkType);

  radioByLocation.addEventListener("click", hideShowDropdown);
  radioByType.addEventListener("click", hideShowDropdown);
};
/* ----------------------------------------------------------- */

function hideShowDropdown(event) {
  if (event.target.value === "byLocation") {
    hideElement("#searchByParkType");
    showElement("#searchByLocation");
  } else {
    hideElement("#searchByLocation");
    showElement("#searchByParkType");
  }
}

/* 

    - Initiating location dropdown menu
*/
function initLocationDropdown() {
  /* 
    - First: get hold of <select> element
    - Second: create <option> element for default option
    - Third: Give a text Content to a option Element
    - Forth: give value as Empty string
    - Fifth: Append that <option> element to <select> element
  */
  let searchByLocation = document.querySelector("#searchByLocation");
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "--Choose a Park Location--";
  defaultOption.value = "";
  searchByLocation.appendChild(defaultOption);

  /* 
    - Now Get all the Location from locationData and put it as DropDown Menu
    - Used forEach loop to achive this
    - First: Create the option for each <option>state</state>
    - Second: Append that option in select dropdown menu
  */
  locationsArray.forEach((location) => {
    let newOption = document.createElement("option");
    newOption.textContent = location;
    searchByLocation.appendChild(newOption);
  });
}
/* ----------------------------------------------------------- */
/* 
    - This is the function that can filter the information based on matching state
    - Here we used foeEach method to achive this
*/
function matchedLocationArray(location, parksData) {
  let matchedParks = [];
  parksData.forEach((park) => {
    if (location.toLowerCase() === park.State.toLowerCase()) {
      matchedParks.push(park);
    }
  });

  return matchedParks;
}

/* ----------------------------------------------------------- */
/* 
    - Display Result in the table
*/
function displayResultByLocation(event) {
  event.preventDefault();
  //Here we will create a default table heading
  let tableHead = document.querySelector("#tableHead");
  let tableBody = document.querySelector("#tableBody");
  let searchByLocation = document.querySelector("#searchByLocation");
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
  /* 
    - First create an <th> element for Location ID
    - Add innerText
    - Append that to <thead> Element
    - ** Here we are creating each <th> element
  */
  let defaultTableHead1 = document.createElement("th");
  defaultTableHead1.innerHTML = "Location ID";
  tableHead.appendChild(defaultTableHead1);

  let defaultTableHead2 = document.createElement("th");
  defaultTableHead2.innerHTML = "Name";
  tableHead.appendChild(defaultTableHead2);

  let defaultTableHead3 = document.createElement("th");
  defaultTableHead3.innerHTML = "Address";
  tableHead.appendChild(defaultTableHead3);

  let defaultTableHead4 = document.createElement("th");
  defaultTableHead4.innerHTML = "Phone";
  tableHead.appendChild(defaultTableHead4);

  let defaultTableHead5 = document.createElement("th");
  defaultTableHead5.innerHTML = "URL";
  tableHead.appendChild(defaultTableHead5);

  /*  - First: get value of what user Selected and pass it as argument
    - Second: Get the Matched array by calling a function called matchedLocationArray by passing the argument
    - Third use forEach loop to display all the matched array in the table */

  let userSelectedOption = searchByLocation.value;
  let npArrayMatchedByLocation = matchedLocationArray(
    userSelectedOption,
    nationalParksArray
  );

  npArrayMatchedByLocation.forEach((park) => {
    buildTableRow(tableBody, park);
  });
}
/* ----------------------------------------------------------- */
/* 
    - This is the function for creating the row in the table <tr>
    - Also we add data on each cell <td>
*/
function buildTableRow(tableBody, data) {
  //First create a first Row
  let newRow = tableBody.insertRow();

  //Now we created a cell and add the informatinng using innerHTML
  let cell1 = newRow.insertCell();
  cell1.innerHTML = data.LocationID;

  let cell2 = newRow.insertCell();
  cell2.innerHTML = data.LocationName;

  let cell3 = newRow.insertCell();
  cell3.innerHTML = `${data.Address} 
                        ${data.City}, ${data.State}`;

  let cell4 = newRow.insertCell();
  cell4.innerHTML = data.Phone ? data.Phone : "N/A";

  let cell5 = newRow.insertCell();
  cell5.innerHTML = data.Visit ? data.Visit : "N/A";
}

/* ------------CODE FOR SEARCH BY LOCATION TYPE------------------------------- */
function initParkTypeDropdown() {
  /* 
      - First: get hold of <select> element
      - Second: create <option> element for default option
      - Third: Give a text Content to a option Element
      - Forth: give value as Empty string
      - Fifth: Append that <option> element to <select> element
    */
  let searchByParkType = document.querySelector("#searchByParkType");
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "--Choose a Park Type--";
  defaultOption.value = "";
  searchByParkType.appendChild(defaultOption);

  /* 
      - Now Get all the Location from locationData and put it as DropDown Menu
      - Used forEach loop to achive this
      - First: Create the option for each <option>state</state>
      - Second: Append that option in select dropdown menu
    */
  parkTypesArray.forEach((location) => {
    let newOption = document.createElement("option");
    newOption.textContent = location;
    searchByParkType.appendChild(newOption);
  });
}

/* 
    - Here we will get the matched park type
    - we have used the filter here
*/
function matchedParkType(parkType, data) {
  return data.filter((park) => {
    if (
      park.LocationName.toLowerCase().indexOf(parkType.toLowerCase()) !== -1
    ) {
      return true;
    }
    return false;
  });
}

/* 
    - Display Result by park-type
    - 
*/
function displayResultByParkType(event) {
  event.preventDefault();
  //Here we will create a default table heading
  let tableHead = document.querySelector("#tableHead");
  let tableBody = document.querySelector("#tableBody");
  let searchByParkType = document.querySelector("#searchByParkType");
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
  /* 
    - First create an <th> element for Location ID
    - Add innerText
    - Append that to <thead> Element
    - ** Here we are creating each <th> element
  */

  let defaultTableHead1 = document.createElement("th");
  defaultTableHead1.innerHTML = "Location ID";
  tableHead.appendChild(defaultTableHead1);

  let defaultTableHead2 = document.createElement("th");
  defaultTableHead2.innerHTML = "Name";
  tableHead.appendChild(defaultTableHead2);

  let defaultTableHead3 = document.createElement("th");
  defaultTableHead3.innerHTML = "Address";
  tableHead.appendChild(defaultTableHead3);

  let defaultTableHead4 = document.createElement("th");
  defaultTableHead4.innerHTML = "Phone";
  tableHead.appendChild(defaultTableHead4);

  let defaultTableHead5 = document.createElement("th");
  defaultTableHead5.innerHTML = "URL";
  tableHead.appendChild(defaultTableHead5);

  /* 
    - First: get value of what user Selected and pass it as argument
    - Second: Get the Matched array by calling a function called matchedLocationArray by passing the argument
    - Third use forEach loop to display all the matched array in the table
*/
  let userSelectedOption = searchByParkType.value;
  let npArrayMatchedByParkType = matchedParkType(
    userSelectedOption,
    nationalParksArray
  );

  npArrayMatchedByParkType.forEach((park) => {
    buildTableRow(tableBody, park);
  });
}

//This function will hide an HTML element on the page
//Just pass it the id of the element you want to hide
function hideElement(someSelector) {
  let el = document.querySelector(someSelector);
  el.style.display = "none";
}

//This function will show an HTML element on the page
//Just pass it the id of the element you want to show
function showElement(someSelector) {
  let el = document.querySelector(someSelector);
  el.style.display = "block";
}
