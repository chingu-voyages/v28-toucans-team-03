'use strict'

import { CountUp } from "./countUp.js";

// Get HTML elements
let globalInfectedTotal = document.getElementById(
	"global__infected__total"
);
let globalInfectedNew = document.getElementById("global__infected__new");
let globalDeathsTotal = document.getElementById("global__deaths__total");
let globalDeathsNew = document.getElementById("global__deaths__new");
let globalRecoveredTotal = document.getElementById(
	"global__recovered__total"
);
let globalRecoveredNew = document.getElementById("global__recovered__new");
let globalReportedDate = document.getElementById("global__reported-date");
let countryInfectedTotal = document.getElementById(
	"country__infected__total"
);
let countryInfectedNew = document.getElementById(
	"country__infected__new"
);
let countryDeathsTotal = document.getElementById(
	"country__deaths__total"
);
let countryDeathsNew = document.getElementById(
	"country__deaths__new"
);
let countryRecoveredTotal = document.getElementById(
	"country__recovered__total"
);
let countryRecoveredNew = document.getElementById(
	"country__recovered__new"
);


fetch("https://api.covid19api.com/summary", {
	mode: 'cors'
})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		let {
			TotalConfirmed,
			NewConfirmed,
			TotalDeaths,
			NewDeaths,
			TotalRecovered,
			NewRecovered,
			Date,
		} = data.Global;
		globalInfectedTotal.textContent = `Total confirmed global infected: ${TotalConfirmed}`;
		countAnimation(data);
		globalInfectedNew.textContent = `New confirmed global infected: ${NewConfirmed}`;
		globalDeathsTotal.textContent = `Total confirmed global deaths: ${TotalDeaths}`;
		globalDeathsNew.textContent = `New confirmed global deaths: ${NewDeaths}`;
		globalRecoveredTotal.textContent = `Total confirmed global recovered: ${TotalRecovered}`;
		globalRecoveredNew.textContent = `New confirmed global recovered: ${NewRecovered}`;
		let Day = Date.slice(0, 10);
		let Time = Date.slice(11);
		Date = `${Day} ${Time}`;
		globalReportedDate.textContent = `Reported Date: ${Date}`
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
			fetch("https://api.covid19api.com/summary", {
				mode: 'cors'
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					data.Countries.forEach((item) => {
						let country = region;
						if (item.Country == country) {
							let {
								TotalConfirmed,
								NewConfirmed,
								TotalDeaths,
								NewDeaths,
								TotalRecovered,
								NewRecovered,
								Date,
							} = item;

							countryInfectedTotal.textContent = `Total confirmed ${country} infected: ${TotalConfirmed}`;
							countryInfectedNew.textContent = `New confirmed ${country} infected: ${NewConfirmed}`;
							countryDeathsTotal.textContent = `Total confirmed ${country} deaths: ${TotalDeaths}`;
							countryDeathsNew.textContent = `New confirmed ${country} deaths: ${NewDeaths}`;
							countryRecoveredTotal.textContent = `Total confirmed ${country} recovered: ${TotalRecovered}`;
							countryRecoveredNew.textContent = `Total confirmed ${country} recovered: ${NewRecovered}`;
							let Day = Date.slice(0, 10);
							let Time = Date.slice(11);
							Date = `${Day} ${Time}`;
						}
					});
				});
		},
	});
});


// Countup function using Countup.js library
function countAnimation(data) {
	const options = {
		duration: 2.0,
	}

	const totalConfirmed = data.Global.TotalConfirmed;
	const countUp = new CountUp('global__infected__total', totalConfirmed, options);
	if(!countUp.error) {
		countUp.start();
	} else {
		console.log('Countup is not working...:(');
	}
}



