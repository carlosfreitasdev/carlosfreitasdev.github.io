let weather = {
	apiKey: "320d654b04c87ab1119ef59d140c3937",
	fetchWeather: function(city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&units=metric&lang=ja")
		.then((response) => response.json())
		.then((data) => this.displayWeather(data));
	},
	displayWeather: function(data) {
		const { name } = data;
		const { icon,description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		const { country } = data.sys;
		document.querySelector(".city").innerText = name + " , " + country;
		document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
		document.querySelector(".description").innerText = description;
		document.querySelector(".temp").innerText = temp + "ºC";
		document.querySelector(".humidity").innerText = "湿度: " + humidity + "%";
		document.querySelector(".wind").innerText = "風速: " + speed + " km/s";
	},
	search: function() {
		this.fetchWeather(document.querySelector(".search-bar").value);
	},
};

document.querySelector(".search button").addEventListener("click", function () {
	weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
	if (event.key == "Enter") {
		weather.search();
	}
});

window.onload = function() {
  document.querySelector(".search-bar").value = "";
  }