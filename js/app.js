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

};

function loadWeather() {
  var forecastUrl = "https://api.forecast.io/forecast/b5f1fcd0a6f50029f63cdce97b53d747/37.8167,23.7833";
  $.ajax({
    url: forecastUrl,
    dataType: "jsonp",
    method: "POST",
    success: function(response) {
      $("#current_temp").html(Math.round(response.currently.temperature) + "&deg;F");
      $("#current_summary").text(response.currently.summary);
      $("#current_temp").attr("data-icon", icons[response.currently.icon]);
      console.log(response);
    },
    error: function(err) {
      console.log("err");
    }
  });
}

function loadCity(city) {
  $("#location").text(city);
}

$("a.city").on("click", function() {
  loadCity($(this).text());
});
