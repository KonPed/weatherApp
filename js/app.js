var icons = {
  "clear-day": "B",
  "clear-night": "C",
  "rain": "R",
  "snow": "W",
  "sleet": "X",
  "wind": "S",
  "fog": "L",
  "cloudy": "Y",
  "partly-cloudy-day": "H",
  "partly-cloudy-night": "3"
};

var cities = {
  Chicago: {
    coords: {
      lat: 41.878114,
      long: -87.629798
    }
  },
  "Los-Angeles": {
    coords: {
      lat: 34.052234,
      long: -118.243685
    }
  },
  Miami: {
    coords: {
      lat: 25.761680,
      long: -80.191790
    }
  },
  "New-York": {
    coords: {
      lat: 40.712784,
      long: -74.005941
    }
  },
  "San-Francisco": {
    coords: {
      lat: 37.774929,
      long: -122.419416
    }
  },
  "Current Location": {
    coords: {
      lat: "",
      long: ""
    }
  }
};

function defaultCity() {
  loadWeather(cities["Chicago"]);
  $("#location").text("Chicago");
}

function getCurrentPos() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      cities["Current Location"].coords.lat = position.coords.latitude;
      cities["Current Location"].coords.long = position.coords.longitude;
    });
  }
}

function loadWeather(cityName) {
  var latlng = cityName.coords.lat + "," + cityName.coords.long;
  var forecastUrl = "https://api.forecast.io/forecast/b5f1fcd0a6f50029f63cdce97b53d747/"+latlng;
  $.ajax({
    url: forecastUrl,
    dataType: "jsonp",
    method: "POST",
    success: function(response) {
      $("#current_temp").html(Math.round(response.currently.temperature) + "&deg;F");
      $("#current_summary").text(response.currently.summary);
      $("#current_temp").attr("data-icon", icons[response.currently.icon]);
    },
    error: function(err) {
      console.log(err.message);
    }
  });
}

$("a.city").on("click", function() {
  if($(this).text() === "Current Location") {
    $("#location").text($(this).text());
    loadWeather(cities["Current Location"]);
  } else {
    $("#location").text($(this).text());
    loadWeather(cities[$(this).text()]);
  }

});
getCurrentPos();
defaultCity();
