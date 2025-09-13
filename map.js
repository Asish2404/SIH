 let map, cafeMarker, routingControl;

    // Initialize map
    map = L.map('map').setView([22.5726, 88.3639], 13); // Default Kolkata

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Get user location
    let userLocation = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        userLocation = [pos.coords.latitude, pos.coords.longitude];
        L.marker(userLocation).addTo(map).bindPopup("📍 You are here").openPopup();
        map.setView(userLocation, 14);
      });
    }

    // Find Cafe function
    function findCafe() {
      const cafeName = document.getElementById("cafeInput").value;
      const mode = document.getElementById("mode").value;
      if (!cafeName) {
        alert("Please enter a cafe name!");
        return;
      }
      if (!userLocation) {
        alert("User location not available yet.");
        return;
      }

      // Nominatim API for searching places
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cafeName},Kolkata`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            let dest = [parseFloat(data[0].lat), parseFloat(data[0].lon)];

            if (cafeMarker) map.removeLayer(cafeMarker);
            cafeMarker = L.marker(dest).addTo(map).bindPopup(cafeName).openPopup();
            map.setView(dest, 14);

            // Remove old route if exists
            if (routingControl) map.removeControl(routingControl);

            // Add new route
            routingControl = L.Routing.control({
              waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(dest[0], dest[1])
              ],
              router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: mode   // car / foot / bike
              }),
              routeWhileDragging: true
            }).addTo(map);

          } else {
            alert("Cafe not found!");
          }
        })
        .catch(err => console.log(err));
    }