import React, { useEffect } from 'react';
import './Map.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

function OLMap() {
  useEffect(() => {
    var map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map'
    });
  })
  return (
    <div>
      <h2>My Map</h2>
      <div id="map" class="map"></div>
    </div>
  )
}

export default OLMap;