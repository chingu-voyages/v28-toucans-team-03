$(document).ready(function () {
	alert("This is a test.");
	getMapImage();
});

function getMapImage() {
	const MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
	const Options = {
	zoom: 1,      //地図の縮尺値
	center: MyLatLng,    //地図の中心座標
	mapTypeId: 'roadmap'   //地図の種類
	};
	const map = new google.maps.Map(document.getElementById('map'), Options);
}