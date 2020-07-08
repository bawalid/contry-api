//Variables Declaration
let allCountries = [];
const structure = `<div class="topDiv">
<div class="search">
  <i class="fas fa-search"></i>
  <input type="text" onkeyup="searchCountry()" id="countryName" name="searchCountry"
    placeholder="Search for a country...">
</div>
<div class="select-box">
  <div class="options-container">

    <div class="option">
      <input type="radio" class="radio" id="automobiles" name="category" />
      <label for="all">All</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="automobiles" name="category" />
      <label for="africa">Africa</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="film" name="category" />
      <label for="amercia">America</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="science" name="category" />
      <label for="asia">Asia</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="art" name="category" />
      <label for="europe">Europe</label>
    </div>

    <div class="option">
      <input type="radio" class="radio" id="music" name="category" />
      <label for="oceania">Oceania</label>
    </div>
  </div>
  <div class="selected">
    Filter by Region
  </div>
</div>
</div>
<div class="countries"></div>`;

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
const countries = document.querySelectorAll(".card");


// fetching selected countries infos
function getData(url) {
    allCountries = [];
    $(".countries").html("");
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                let prop = {
                    countryName: data[i].name,
                    countryFlag: data[i].flag,
                    countryPopulation: data[i].population,
                    countryRegion: data[i].region,
                    countrySubRegion: data[i].subregion,
                    countryCapital: data[i].capital,
                    countryNativeName: data[i].nativeName,
                    countryTLDomain: data[i].topLevelDomain,
                    countryCurr: data[i].currencies[0].name,
                    countryLanguage: data[i].languages[0].name,
                    countryBorder: data[i].borders
                }
                allCountries.push(prop);
                $(".countries").append('<div data-name="' + allCountries[i].countryName + '" class="card"><img class="flag" src="' + allCountries[i].countryFlag + '"><div data-name="' + allCountries[i].countryName + '" class="info"><h1>' + allCountries[i].countryName + '</h1><p><strong>Population: </strong>' + formatNumber(allCountries[i].countryPopulation) + '</p><p><strong>Region: </strong>' + allCountries[i].countryRegion + '</p><p><strong>Capital: </strong>' + allCountries[i].countryCapital + '</p></div></div>');
            }
            $.each($('.card'), function () {
                $(this).click(function (e) {
                    const countryName = $(e.target).parent()[0].dataset.name;
                    $(".countries").html("");
                    getCountry(countryName);

                });
            });
        });

}

//Full country info
function getCountry(country) {
    const url = 'https://restcountries.eu/rest/v2/name/' + country;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let bordersList = [];
            bordersList = (data[0].borders);
            let prop = {
                countryName: data[0].name,
                countryFlag: data[0].flag,
                countryPopulation: data[0].population,
                countryRegion: data[0].region,
                countrySubRegion: data[0].subregion,
                countryCapital: data[0].capital,
                countryNativeName: data[0].nativeName,
                countryTLDomain: data[0].topLevelDomain,
                countryCurr: data[0].currencies[0].name,
                countryLanguage: data[0].languages[0].name,
                countryBorder: data[0].borders
            }

            $("#cards").html("");
            const struct = `<div class="back">
            <i class="fas fa-arrow-left"></i>
            <p>Back</p>
          </div>
          <div class="poster">
            <img src="${prop.countryFlag}" alt="">
            <div class="info">
              <h1>${prop.countryName}</h1>
              <div class="one">
                <p><strong>Native Name: </strong>${prop.countryNativeName}</p>
                <p><strong>Population: </strong>${formatNumber(prop.countryPopulation)}</p>
                <p><strong>Region: </strong>${prop.countryRegion}</p>
                <p><strong>Sub Region: </strong>${prop.countrySubRegion}</p>
                <p><strong>Capital: </strong>${prop.countryCapital}</p>
              </div>
              <div class="two">
                <p><strong>Top Level Domain: </strong>${prop.countryTLDomain}</p>
                <p><strong>Currencies: </strong>${prop.countryCurr}</p>
                <p><strong>Languages: </strong>${prop.countryLanguage}</p>
              </div>
              <div class="three">
                <p><strong>Border Countries:</strong></p>
                <div class="borders"></div>
              </div>
            </div>
          </div>`;

            $("#cards").html(struct);
            $('.borders').html("");
            getCountryByAlpha(bordersList);
            $(".back").click(function () {
                $("#cards").html(structure);
                getData('https://restcountries.eu/rest/v2/all');
            });

        });
}

// get border's countries names
function getCountryByAlpha(border) {
    border.forEach(b => {
        fetch('https://restcountries.eu/rest/v2/alpha/' + b)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const Countryname = data.name;
                appendBorders(Countryname);
            });
    });
}

// Append borders
function appendBorders(bName) {
    $('.borders').append('<div class="border">' + bName + '</div>');
}


// Dropdown List
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        url = "https://restcountries.eu/rest/v2/region/" + selected.innerHTML;
        if (selected.innerHTML === "All") {
            getData('https://restcountries.eu/rest/v2/all');
        } else {
            getData(url);
        }
        optionsContainer.classList.remove("active");
    });
});

// DarkMode switch
$(".darkMode").click(function () {
    if ($('html').attr("data-theme") === "light") {
        $('html').attr("data-theme", "dark");
        $('.darkMode i').removeClass("far");
        $('.darkMode i').addClass("fas");

    } else {
        $('html').attr("data-theme", "light");
        $('.darkMode i').removeClass("fas");
        $('.darkMode i').addClass("far");
    }
});

// format numbers
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Search Country
function searchCountry() {
    let input = document.getElementById("countryName").value;
    if (!input) {
        getData('https://restcountries.eu/rest/v2/all');
    } else {
        getData('https://restcountries.eu/rest/v2/name/' + input);
    }
}

getData('https://restcountries.eu/rest/v2/all');