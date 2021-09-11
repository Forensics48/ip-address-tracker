var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var marker;
var blackIcon = L.icon({
    iconUrl: './images/icon-location.svg',
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG90dGV4IiwiYSI6ImNrdGVjbDRmaTAybDkyb253cGwxa3BwZngifQ.iWrIxxLYITZUr8yObv9riw'
}).addTo(mymap);

async function submitForm() {
    var x = document.getElementById("user-input-ip");
    var userIP = document.getElementById("user-ip");
    var userLocation = document.getElementById("user-location");
    var userTimezone = document.getElementById("user-timezone");
    var userIsp = document.getElementById("user-isp");

    if (x.value == "") {
        alert("Enter a valid IP");
        return;
    } else {
        
        if(marker != undefined) {
            mymap.removeLayer(marker);
        }
        var obj;
        await fetch('https://geo.ipify.org/api/v1?apiKey=at_45lg0m23vo2Pw1bEJOs1yafogXeNP&ipAddress=' + x.value)
            .then(res => res.json())
            .then(data => obj = data);
        userIP.innerHTML = x.value + '<span class="vertical-line"></span>';
        userLocation.innerHTML = obj.location.city + ', ' + obj.location.region  + '<span class="vertical-line"></span>' + '</br>' + obj.location.postalCode;
        userTimezone.innerHTML = 'UTC ' + obj.location.timezone + '<span class="vertical-line"></span>';
        userIsp.innerHTML = obj.isp;
        mymap.setView(new L.LatLng(obj.location.lat, obj.location.lng), 15);
        marker = L.marker([obj.location.lat, obj.location.lng], {icon: blackIcon}).addTo(mymap);
        x.value = "";
    }
}