$(document).ready(function () {
	//CLINICS
	var clinicsSearch = function () {
		var city = $("#form__clinics__input").val();

		var url = `https://www.google.com/maps/embed/v1/search?key=AIzaSyCXvXc3QXwja_tb3jkY0CB8EfF1vrEhX-0
        &q=clinic+in+${city}`;

		$("#clinics").attr("src", url);

		return false;
	};

	var formSubmitClinics = function (input) {
		$("#form__clinics").submit(clinicsSearch);
	};
	formSubmitClinics();

	//HOSPITALS
	var hospitalsSearch = function () {
		var city = $("#form__hospitals__input").val();

		var url = `https://www.google.com/maps/embed/v1/search?key=AIzaSyCXvXc3QXwja_tb3jkY0CB8EfF1vrEhX-0
        &q=hospital+in+${city}`;

		$("#hospitals").attr("src", url);

		return false;
	};

	var formSubmitHospitals = function (input) {
		$("#form__hospitals").submit(hospitalsSearch);
	};
	formSubmitHospitals();
});
