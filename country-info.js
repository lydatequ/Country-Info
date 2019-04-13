let button = document.querySelector("#getinfo");
let input = document.querySelector("#countryname");

button.addEventListener ( "click", clickHandler);

function clickHandler() {

    let input = document.querySelector("#countryname");
    let value = input.value;
    if (value.length > 0) {
        value = value.toLowerCase();
        value = value.trim();
        $.ajax({
            url: "https://restcountries.eu/rest/v2/name/" + value,
            success: ajaxHandler
        })
    } else {
        console.log("Please enter a country");
    }

}

// $.ajax -> ajaxHandler([{ name: "Japan", ... }])

function ajaxHandler(data) {
    let countryData = data[0];
    console.log(countryData.name);
    console.log(countryData.capital);
    console.log(countryData.population);
    console.log(countryData.latlng);
    document.querySelector ("#map").innerHTML = "";
    openMap({
        lat: countryData.latlng[0],
        lon: countryData.latlng[1]
    });
    document.querySelector("#info").innerHTML = `
        <p>Country: ${countryData.name}</p>
        <p>Capital: ${countryData.capital}</p>
        <p>Population: ${countryData.population}</p>
  `;
}

function openMap(options) {
    if (options.zoom === undefined) {
        options.zoom = 4;
    }
    if (options.target === undefined) {
        options.target = "map";
    }
    let map = new ol.Map({
        target: options.target,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([options.lon, options.lat]),
            zoom: options.zoom
        })
    });
}

