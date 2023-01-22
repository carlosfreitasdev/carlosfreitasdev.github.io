var map = L.map('map');
map.setView([51.505, -0.09], 15);
var marker = L.marker(map.getCenter()).addTo(map);
var mapa = false;
var lang = document.querySelector(".lang").value;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let weather = {
	apiKey: "320d654b04c87ab1119ef59d140c3937",
	fetchWeather: function(city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&units=metric&lang=" + lang)
		.then((response) => response.json())
		.then((data) => this.displayWeather(data));
	},
	fetchWeatherMap: function(lat, lon) {
		fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + this.apiKey + "&units=metric&lang=" + lang)
		.then((response) => response.json())
		.then((data) => this.displayWeather(data));
		mapa = true;
	},
	displayWeather: function(data) {
		const { name } = data;
		const { icon,description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		const { country } = data.sys;
		const {lat, lon } = data.coord;
		marker.setLatLng([lat, lon], 10);
		map.setView([lat, lon]);
		if (mapa == true)
		{
			document.querySelector(".search-bar").value = name;
		}
		if (lang == 'ja')
		{
			document.querySelector(".city").innerText = name + " , " + country;
			document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
			document.querySelector(".description").innerText = description;
			document.querySelector(".temp").innerText = temp + "ºC";
			document.querySelector(".humidity").innerText = "湿度: " + humidity + "%";
			document.querySelector(".wind").innerText = "風速: " + speed + " km/s";
		}
		if (lang == 'en')
		{
			document.querySelector(".city").innerText = name + " , " + country;
			document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
			document.querySelector(".description").innerText = description;
			document.querySelector(".temp").innerText = temp + "ºC";
			document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
			document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/s";
		}
	},
	search: function() {
		this.fetchWeather(document.querySelector(".search-bar").value);
	}
};

document.querySelector(".search button").addEventListener("click", function ()
{
	pos = marker.getLatLng();
	weather.fetchWeatherMap(pos.lat, pos.lng);
});

document.querySelector(".search-bar").addEventListener("keyup", function (event)
{
	if (event.key == "Enter") {
		weather.search();
		mapa = false;
	}
});

window.onload = function()
{
  document.querySelector(".search-bar").value = "";
};

map.on('move',function(e)
{
	marker.setLatLng(map.getCenter());
});