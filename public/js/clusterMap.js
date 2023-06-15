mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  // style: 'mapbox://styles/mapbox/dark-v11',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: [-103.5917, 40.6699],
  zoom: 3,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
  // Add a new source from our GeoJSON data, set the 'cluster' option to true,
  // add the point_count property to your source data.
  map.addSource('retreats', {
    type: 'geojson',
    data: retreats,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'retreats',
    filter: ['has', 'point_count'],
    paint: {

      // three steps to implement three types of circles:
      //   * #51bbd6, 20px circles when point count is less than 100
      //   * #51bbd6, 30px circles when point count is between 100 and 750
      //   * #52db69, 40px circles when point count is greater than or equal to 750
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        10,
        '#f1f075',
        25,
        '#52db69',
      ],
      'circle-radius': ['step', ['get', 'point_count'], 12, 10, 20, 25, 28]
    },
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'retreats',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  });

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'retreats',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#52dbdb',
      'circle-radius': 7,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#000',
    },
  });

  // inspect a cluster on click
  map.on('click', 'clusters', e => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters'],
    });
    const clusterId = features[0].properties.cluster_id;
    map
      .getSource('retreats')
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  // open a popup at the unclustered-point layer
  map.on('click', 'unclustered-point', e => {
    const { popUpMarkup } = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popUpMarkup)
      .addTo(map);
  });

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });
});