'use strict';
// Get elements from HTML
const infectedNumAll = document.getElementById('infectedNum__all');
const infectedNumToday = document.getElementById('infectedNum__today');
const recoveredNumAll = document.getElementById('recoveredNum__all');
const recoveredNumToday = document.getElementById('recoveredNum__today');
const deadNumall = document.getElementById('deadNum__all');
const deadNumToday = document.getElementById('deadNum__today');

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
			var message =
				'You clicked "' +
				region +
				'" which has the code: ' +
				code.toUpperCase();

			alert(message);

			// Fetch data from API
			fetch(`https://corona.lmao.ninja/v2/countries/${code.toUpperCase()}`)
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				updateData(data);
			})
		},
	});
});

function updateData(data) {
	// Update number
	infectedNumAll.innerText = 'Number of infected: ' + data.cases;
	infectedNumToday.innerText = 'Number of recoveries: ' + data.todayCases;
}

