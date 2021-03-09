fetch("https://api.covid19api.com/summary")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		let globalInfectedTotal = document.querySelector(
			".global__infected__total"
		);
		let globalInfectedNew = document.querySelector(".global__infected__new");
		let globalDeathsTotal = document.querySelector(".global__deaths__total");
		let globalDeathsNew = document.querySelector(".global__deaths__new");
		let globalRecoveredTotal = document.querySelector(
			".global__recovered__total"
		);
		let globalRecoveredNew = document.querySelector(".global__recovered__new");
		let globalReportedDate = document.querySelector(".global__reported-date");
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
		globalInfectedNew.textContent = `New confirmed global infected: ${NewConfirmed}`;
		globalDeathsTotal.textContent = `Total confirmed global deaths: ${TotalDeaths}`;
		globalDeathsNew.textContent = `New confirmed global deaths: ${NewDeaths}`;
		globalRecoveredTotal.textContent = `Total confirmed global recovered: ${TotalRecovered}`;
		globalRecoveredNew.textContent = `New confirmed global recovered: ${NewRecovered}`;
		Day = Date.slice(0, 10);
		Time = Date.slice(11);
		Date = `${Day} ${Time}`;
		globalReportedDate.textContent = `Reported Date: ${Date}`;
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
					let countryInfectedTotal = document.querySelector(
						".country__infected__total"
					);
					let countryInfectedNew = document.querySelector(
						".country__infected__new"
					);
					let countryDeathsTotal = document.querySelector(
						".country__deaths__total"
					);
					let countryDeathsNew = document.querySelector(
						".country__deaths__new"
					);
					let countryRecoveredTotal = document.querySelector(
						".country__recovered__total"
					);
					let countryRecoveredNew = document.querySelector(
						".country__recovered__new"
					);
					let countryReportedDate = document.querySelector(
						".country__reported-date"
					);
					data.Countries.forEach((item) => {
						country = region;
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
							Day = Date.slice(0, 10);
							Time = Date.slice(11);
							Date = `${Day} ${Time}`;
							countryReportedDate.textContent = `Reported Date: ${Date}`;
						}
					});
				});
		},
	});
});
