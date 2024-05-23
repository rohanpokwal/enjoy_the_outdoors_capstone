"use strict";

window.onload = () => {
  initDropdown();
  let donationDropDown = document.querySelector("#donationDropDown");
  let paymentBtn = document.querySelector("#paymentBtn");
  paymentBtn.addEventListener("click", displayResult);
};

function initDropdown() {
  let donationDropDown = document.querySelector("#donationDropDown");

  let defaultOption = document.createElement("option");
  defaultOption.textContent = "--Choose Your Favorite Park--";
  defaultOption.value = "";
  donationDropDown.appendChild(defaultOption);

  nationalParksArray.forEach((park) => {
    let newOption = document.createElement("option");
    newOption.textContent = park.LocationName;

    donationDropDown.appendChild(newOption);
  });
}

function displayResult(event) {
  event.preventDefault();
  let results = document.querySelector("#result");
  let donationDropDown = document.querySelector("#donationDropDown");
  let fsName = document.querySelector("#fsName").value;
  let donationAmt = document.querySelector("#donationAmt").value;
  let userSelectedPark = donationDropDown.value;
  let message = `<p>Thank You! ${fsName}, your donation amount of $ ${donationAmt} is donated to ${userSelectedPark}.</p>`;
  results.innerHTML = message;
}
