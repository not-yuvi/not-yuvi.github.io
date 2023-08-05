'use strict';

console.log('test starting...');

let visitorName = JSON.parse(localStorage.getItem('visitorName'));
console.log(visitorName);

let elementsToHide = document.getElementsByClassName("login=hide");
let elementsToShow = document.getElementsByClassName("login=show");

//check if button is clicked
document.getElementById('loginbutton').addEventListener('click', buttonClicked);
document.getElementById('catbutton').addEventListener('click', getCatFact);
document.getElementById('weatherbutton').addEventListener('click', getWeather);
document.getElementById('button3').addEventListener('click', function() {
    localStorage.setItem('visitorName', JSON.stringify(null));
});
//document.getElementById('afterlogin').hidden = true;

if(visitorName == null) {
    
} else {
    document.getElementById('loginbutton').textContent = 'Change Name';
    buttonClicked(false);
}

function buttonClicked(notCached) {
    if(notCached) {
        //set heading by asking prompt
        let name = prompt('What is your name?', 'Guest');
        if (name == null || name == '' || name == 'Guest') {
            document.getElementById('heading').textContent = 'Hello Guest!';
            for (var i = 0; i < elementsToShow.length; i++) {
                elementsToShow[i].hidden = false;
            }
            for (var i = 0; i < elementsToHide.length; i++) {
                elementsToHide[i].hidden = true;
            }
        } else {
            document.getElementById('heading').textContent = 'Hello ' + name + '!';
            localStorage.setItem('visitorName', JSON.stringify(name));
            for (var i = 0; i < elementsToShow.length; i++) {
                elementsToShow[i].hidden = false;
            }
            for (var i = 0; i < elementsToHide.length; i++) {
                elementsToHide[i].hidden = true;
            }
        }
    } else {
        console.log("Using cached data:", visitorName);
        document.getElementById('heading').textContent = 'Hello ' + visitorName + '!';
        for (var i = 0; i < elementsToShow.length; i++) {
            elementsToShow[i].hidden = false;
        }
        for (var i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].hidden = true;
        }
    }

}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function getCatFact() {
    //get cat fact from api
    fetch('https://meowfacts.herokuapp.com/')
        .then((response) => response.json())
        .then(async (data) => {
            document.getElementById('outputext').textContent = data.data[0];
            document.getElementById('moreoutput').textContent = '';
            fetch('https://cataas.com/cat?width=100&height=100')
                .then((response) => response.blob())
                .then((data) => {
                    document.getElementById('image').src = URL.createObjectURL(data);
                });
            document.getElementById('catbutton').disabled = true;
            document.getElementById('catbutton').textContent = 'Wait...';
            await wait(2000);
            document.getElementById('catbutton').disabled = false;
            document.getElementById('catbutton').textContent = 'Get another fact';
        });
}
async function getWeather() {
let weatherLocation = '';
let city;
    //get weather from api
    //get location by asking zip code and convert zip code to x and y coordinates using https://nominatim.openstreetmap.org/search.php?q=<ZIPCODE>&format=jsonv2

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;

            // Fetch geolocation data using the obtained IP address
            fetch(`http://ip-api.com/json/${ipAddress}`)
                .then(response => response.json())
                .then(async data => {
                    console.log(data);
                    const x = data.lat;
                    const y = data.lon;
                    city = data.city;
                    //set location to result of https://api.weather.gov/points/' + x + ',' + y
                    //set weatherLocation to result of location.properties.gridId + '/' + location.properties.gridX + ',' + location.properties.gridY
                    let location = await fetch('https://api.weather.gov/points/' + x + ',' + y);
                    let locationData = await location.json();
                    console.log(locationData);
                    weatherLocation = locationData.properties.gridId + '/' + locationData.properties.gridX + ',' + locationData.properties.gridY;
                    console.log(weatherLocation);

                    fetch('https://api.weather.gov/gridpoints/' + weatherLocation + '/forecast')
                        .then((response) => response.json())
                        .then(async (data) => {
                            console.log(data);
                            document.getElementById('outputext').textContent = data.properties.periods[0].name + ' at ' + city + ',\nThe temperature is/will be ' + data.properties.periods[0].temperature + '°F' + '\n' + 'The weather is ' + data.properties.periods[0].shortForecast
                            document.getElementById('moreoutput').textContent = 'More info: ' + data.properties.periods[0].detailedForecast;
                            document.getElementById('image').src = data.properties.periods[0].icon;
                            document.getElementById('weatherbutton').disabled = true;
                            document.getElementById('weatherbutton').textContent = 'Wait...';
                            await wait(5000);
                            document.getElementById('weatherbutton').disabled = false;
                            document.getElementById('weatherbutton').textContent = 'Refresh Forecast';
                        });
                })
                .catch(error => {
                    console.log('Error fetching geolocation data:', error);
                });
        })
        .catch(error => {
            console.log('Error fetching IP address:', error);
        });
}
