let output = document.querySelector(".body__elem");
let output2 = document.querySelector(".body__elem-2");
fetch("https://api.covid19api.com/summary")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		let { TotalConfirmed, TotalDeaths, Date } = data.Global;
		Date = Date.slice(0, 10);
		output.textContent = `Total confirmed infections globally is ${TotalConfirmed}, while total deaths is ${TotalDeaths} as of ${Date}.`;
	});
jQuery(document).ready(function () {
	jQuery("#vmap").vectorMap({
		map: "world_en",
		backgroundColor: "#a5bfdd",
		borderColor: "#818181",
		borderOpacity: 0.25,
		borderWidth: 1,
		color: "#f4f3f0",
		enableZoom: true,
		hoverColor: "#c9dfaf",
		hoverOpacity: null,
		normalizeFunction: "linear",
		scaleColors: ["#b6d6ff", "#005ace"],
		selectedColor: "#c9dfaf",
		selectedRegions: null,
		showTooltip: true,
		onRegionClick: function (element, code, region) {
			fetch("https://api.covid19api.com/summary")
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					data.Countries.forEach((item) => {
						country = region;
						if (item.Country == country) {
							let { TotalConfirmed, TotalDeaths, Date } = item;
							Date = Date.slice(0, 10);
							output2.textContent = `Total confirmed infections in ${country} is ${TotalConfirmed}, while total deaths is ${TotalDeaths} as of ${Date}.`;
						}
					});
				});
		},
	});
});
