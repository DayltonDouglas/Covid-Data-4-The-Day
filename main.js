let covid19data;

function setButtonFunctions() {
  fetch("https://covid-193.p.rapidapi.com/statistics", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "b7c2a7cf8amsh1fabb237102b82ap1f049fjsn94310bffa79d",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("COVID 19 API object:");
      console.log(response);
      console.log("\n");

      // add all countries to select element
      response.response.forEach((c) => {
        const option = document.createElement("option");
        option.innerHTML = c.country;
        document.getElementById("countries").appendChild(option);
      });

      // save covid data to global variable
      covid19data = response.response;
      document.getElementById("countries").onchange = function () {
        const selectedValue = document.getElementById("countries").value;
        const countryData = covid19data.filter(
          (c) => c.country == selectedValue
        )[0];
        console.log(countryData);
        // display data
        const newConfirmed = document.getElementById("covidNewConfirmed");
        const totalConfirmed = document.getElementById("covidTotalConfirmed");
        const covidNewDeaths = document.getElementById("covidNewDeaths");
        const covidTotalDeaths = document.getElementById("covidTotalDeaths");
        const lastUpdated = document.getElementById("covidLastUpdate");

        countryData.cases.new
          ? (newConfirmed.innerHTML =
              "New confirmed cases: " + countryData.cases.new)
          : (newConfirmed.innerHTML = "New confirmed cases: 0");
        countryData.cases.total
          ? (totalConfirmed.innerHTML =
              "Total confirmed cases: " + countryData.cases.total)
          : (totalConfirmed.innerHTML = "Total confirmed cases: 0");
        countryData.deaths.new
          ? (covidNewDeaths.innerHTML = "New deaths: " + countryData.deaths.new)
          : (covidNewDeaths.innerHTML = "New deaths: 0");
        countryData.deaths.total
          ? (covidTotalDeaths.innerHTML =
              "Total deaths: " + countryData.deaths.total)
          : (covidTotalDeaths.innerHTML = "Total deaths: 0");
        lastUpdated.innerHTML = "Last updated: " + countryData.day;
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

function abrir() {
  let modal = document.querySelector(".modal-container");

  modal.style.display = "block";
}
function fechar() {
  let modal = document.querySelector(".modal-container");

  modal.style.display = "none";
}
setButtonFunctions();
