var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=7dce3fb2a64e5731b2c286fe99586ec2';

var kelvinToF = function(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32);
}

module.exports = function(latitude, longitude){
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: json.weather[0].description
      }
    });
}
