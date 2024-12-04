window.onload = function () {
  // Variables
  var locationElement = document.getElementById("location");
  var iconElement = document.getElementById("icon");
  var temperatureElement = document.getElementById("temperature");
  var conditionsElement = document.getElementById("conditions");
  var sunriseElement = document.getElementById("sunrise");
  var sunsetElement = document.getElementById("sunset");
  var torontoElement = document.getElementById("toronto");
  var lagosElement = document.getElementById("lagos");
  var outputElement = document.getElementById("output");
  var errorElement = document.getElementById("error");

  var apikey = "c03965895689d72e9efe68fdb043443a"; 

  // Function to fetch and display weather for a city
  function fetchWeather(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    outputElement.style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var weatherData = xhr.response;

          console.log(weatherData);

          var conditions = weatherData.weather[0].description;
          var formattedConditions = 
            conditions.charAt(0).toUpperCase() + conditions.slice(1) + '.';


          // var timezoneOffset = weatherData.timezone; 
          // var sunriseDate = new Date((weatherData.sys.sunrise + timezoneOffset) * 1000)
          //   .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          // var sunsetDate = new Date((weatherData.sys.sunset + timezoneOffset) * 1000)
          //   .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          var sunriseDate = new Date((weatherData.sys.sunrise) * 1000);
          var sunsetDate =  new Date((weatherData.sys.sunset) * 1000);

          function UTC_offset(seconds) {
            var sign = seconds < 0 ? '-' : '+';
            seconds = Math.abs(seconds);
            let hours = Math.floor( seconds/3600);
            seconds -= hours * 3600;
            let mins = Math.floor( seconds/60);
            return sign+hours.toString().padStart(2, '0')+mins.toString().padStart(2, '0');
          }

          function options( weatherData) {
            return {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: UTC_offset( weatherData.timezone)
            }
          }

          locationElement.innerHTML = weatherData.name;

          iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description} icon" title="${weatherData.weather[0].description} icon"/>`;

          temperatureElement.innerHTML = Math.round(weatherData.main.temp) + "&#8451;";

          conditionsElement.innerHTML = `${formattedConditions}`;

          sunriseElement.innerHTML = sunriseDate.toLocaleTimeString( [], options(weatherData));

          sunsetElement.innerHTML = sunsetDate.toLocaleTimeString( [], options(weatherData));
        } else {
          errorElement.innerHTML = "API call was unsuccessful";
          console.log(xhr.status);
        }
      }
    };

    xhr.open("GET", apiUrl);
    xhr.responseType = "json";
    xhr.send(null);

  }

  // Event listeners for each city
  torontoElement.addEventListener("click", function () {
    fetchWeather("toronto");
  });

  lagosElement.addEventListener("click", function () {
    fetchWeather("lagos");
  });


};