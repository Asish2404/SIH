let map;
let geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 22.5726, lng: 88.3639 }, // Default: Kolkata
        zoom: 13,
    });
    geocoder = new google.maps.Geocoder();
}

function findCafe() {
    const cafeName = document.getElementById("cafeInput").value;
    if (cafeName === "") {
        alert("Please enter a cafe name!");
        return;
    }

    geocoder.geocode({ address: cafeName }, (results, status) => {
        if (status === "OK") {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
        } else {
            alert("Cafe not found: " + status);
        }
    });
}