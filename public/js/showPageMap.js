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
      `<h6>${retreat.title}</h6><p><em>${retreat.location}</em></p>`
    )
  )
  .addTo(map);