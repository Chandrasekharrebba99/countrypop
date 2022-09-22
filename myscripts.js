let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");

function displayitems(name, flag, population) {
    let divcontainerEl = document.createElement("div");
    divcontainerEl.style.width = "90vw";
    divcontainerEl.classList.add("d-flex", "flex-row", "col-md-5");
    let imageEl = document.createElement("img");
    let titleEL = document.createElement("p");
    let populationEl = document.createElement("p");
    divcontainerEl.classList.add("country-card", "result-countries");
    imageEl.src = flag;
    titleEL.textContent = name;
    populationEl.textContent = population;

    titleEL.classList.add("country-name");
    populationEl.classList.add("country-population");

    let imagedivEL = document.createElement("div");
    imageEl.classList.add("country-flag");
    imagedivEL.appendChild(imageEl);

    divcontainerEl.appendChild(imagedivEL);
    divcontainerEl.classList.add();
    let divEL = document.createElement("div");
    divEL.appendChild(titleEL);
    divEL.appendChild(populationEl);
    divEL.classList.add("ml-3");
    divcontainerEl.appendChild(divEL);
    resultCountries.classList.add("m-3")
    resultCountries.appendChild(divcontainerEl);
}
let searchval = "";

function displayresult(response) {

    for (let item of response) {
        let {
            name,
            flag,
            population
        } = item;
        if (name.toLowerCase().includes(searchval.toLowerCase()))
            displayitems(name, flag, population);
    }
}

function getCountryies() {
    let options = {
        method: "GET"
    };

    fetch("https://apis.ccbp.in/countries-data", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            displayresult(response);
        });
}


getCountryies()
searchInput.addEventListener("keydown", function(event) {
    resultCountries.textContent = "";
    if (event.key === "Enter") {
        searchval = searchInput.value;
        getCountryies();
    }
})
