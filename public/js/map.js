"use strict";

import { CountUp } from "./countUp.js";

fetch("https://api.covid19api.com/summary", {
	mode: "cors",
})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		let {
			TotalConfirmed,
			NewConfirmed,
			TotalDeaths,
			NewDeaths,
			TotalRecovered,
			NewRecovered,
		} = data.Global;

		// Countup function using Countup.js library
		function countAnimationGlobal() {
			const options = {
				duration: 2.0,
			};
			const totalConfirmed = new CountUp(
				"global__infected__total",
				TotalConfirmed,
				options
			);
			const newConfirmed = new CountUp(
				"global__infected__new",
				NewConfirmed,
				options
			);
			const totalDeaths = new CountUp(
				"global__deaths__total",
				TotalDeaths,
				options
			);
			const newDeaths = new CountUp("global__deaths__new", NewDeaths, options);
			const totalRecovered = new CountUp(
				"global__recovered__total",
				TotalRecovered,
				options
			);
			const newRecovered = new CountUp(
				"global__recovered__new",
				NewRecovered,
				options
			);
			if (
				!totalConfirmed.error ||
				!newConfirmed.error ||
				!totalDeaths.error ||
				!newDeaths.error ||
				!totalRecovered.error ||
				!newRecovered.error
			) {
				totalConfirmed.start();
				newConfirmed.start();
				totalDeaths.start();
				newDeaths.start();
				totalRecovered.start();
				newRecovered.start();
			} else {
				console.log("Countup is not working...:(");
			}
		}

		//Count Up function call
		countAnimationGlobal();
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
				mode: "cors",
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
							} = item;

							// Countup function using Countup.js library
							function countAnimationCountry() {
								const options = {
									duration: 2.0,
								};
								const totalConfirmed = new CountUp(
									"country__infected__total",
									TotalConfirmed,
									options
								);
								const newConfirmed = new CountUp(
									"country__infected__new",
									NewConfirmed,
									options
								);
								const totalDeaths = new CountUp(
									"country__deaths__total",
									TotalDeaths,
									options
								);
								const newDeaths = new CountUp(
									"country__deaths__new",
									NewDeaths,
									options
								);
								const totalRecovered = new CountUp(
									"country__recovered__total",
									TotalRecovered,
									options
								);
								const newRecovered = new CountUp(
									"country__recovered__new",
									NewRecovered,
									options
								);
								if (
									!totalConfirmed.error ||
									!newConfirmed.error ||
									!totalDeaths.error ||
									!newDeaths.error ||
									!totalRecovered.error ||
									!newRecovered.error
								) {
									totalConfirmed.start();
									newConfirmed.start();
									totalDeaths.start();
									newDeaths.start();
									totalRecovered.start();
									newRecovered.start();
								} else {
									console.log("Countup is not working...:(");
								}
							}

							//Count Up function call
							countAnimationCountry();

							//Update country header to display country name
							let header = document.querySelector(".container__country");
							header.innerHTML = `Country (${country})`;
						}
					});
				});
		},
	});
});
