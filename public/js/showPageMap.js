mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  // style: 'mapbox://styles/mapbox/streets-v12', // style URL
  style: 'mapbox://styles/mapbox/outdoors-v12',
  // style: 'mapbox://styles/mapbox/satellite-v9',
  center: retreat.geometry.coordinates,
  zoom: 10,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker({
  color: "#0000ff",
  draggable: true
}).setLngLat(retreat.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
      `<h6>${retreat.location}</h6><p>Lat: ${retreat.geometry.coordinates[1].toFixed(3)}, Long: ${retreat.geometry.coordinates[0].toFixed(3)}</p>`
    )
  )
  .addTo(map);