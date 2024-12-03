window.onload = function( ){
  //var apiKey = "c03965895689d72e9efe68fdb043443a"; 
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=c03965895689d72e9efe68fdb043443a";

  var locationElement = document.getElementById('location');
  var temperatureElement = document.getElementById('temperature');
  var conditionsElement = document.getElementById('conditions');

  var xhr = new XMLHttpRequest();

  xhr.open('GET', apiUrl, true);

  xhr.responseType = "json";
  xhr.send(null);

  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var weatherData = xhr.response;
        console.log(weatherData);

        var temperature = Math.round(weatherData.main.temp); 
        var conditions = weatherData.weather[0].description;
        var formattedConditions =
        conditions.charAt(0).toUpperCase() + conditions.slice(1) + '.';

        locationElement.innerHTML = weatherData.name;
        temperatureElement.innerHTML = `${temperature} &degC`;
        conditionsElement.innerHTML = `${formattedConditions}`;

      } else {
        locationElement.innerHTML = "API call was unsuccessful";
        console.log(xhr.status);
      }
    }
  }
};