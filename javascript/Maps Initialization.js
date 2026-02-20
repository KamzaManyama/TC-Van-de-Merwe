
  const map = L.map("map").setView([-28.5, 24.5], 6);

  // Dark themed tiles (clean + professional)
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap & CartoDB",
  }).addTo(map);

  // Custom icon colors (like your Google version)
  function getIcon(type) {
    const colors = {
      hq: "green",
      port: "violet",
      mining: "yellow",
      agri: "orange",
      dc: "blue",
      hub: "blue"
    };

    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${colors[type] || "blue"}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  // Your original structured data restored
  const locations = [
    { lat: -26.195246, lng: 28.034088, title: "Johannesburg - Industrial Hub", type: "hub" },
    { lat: -25.747868, lng: 28.229271, title: "Pretoria - Distribution Centre", type: "dc" },
    { lat: -25.4658, lng: 30.9852, title: "Mbombela - Regional Hub", type: "hub" },
    { lat: -23.8969, lng: 29.4486, title: "Polokwane - Mining Corridor", type: "mining" },
    { lat: -29.8587, lng: 31.0218, title: "Durban - Port Access", type: "port" },
    { lat: -26.7125, lng: 27.0911, title: "Potchefstroom - Agricultural", type: "agri" },
    { lat: -28.7224, lng: 24.7245, title: "Kimberley - Regional", type: "hub" },
    { lat: -25.9928, lng: 28.1329, title: "Midrand Glen - HEADQUARTERS", type: "hq" },
  ];

  // Add markers with type-based icons
  locations.forEach(loc => {
    L.marker([loc.lat, loc.lng], {
      icon: getIcon(loc.type),
    })
      .addTo(map)
      .bindPopup(`<b>${loc.title}</b>`);
  });

  // Route line (major corridor)
  const routeCoordinates = [
    [-26.195246, 28.034088],
    [-25.747868, 28.229271],
    [-24.6541, 28.4067],
    [-23.8969, 29.4486],
  ];

  L.polyline(routeCoordinates, {
    color: "#a8a29e",
    weight: 3,
    opacity: 0.8,
  }).addTo(map);

