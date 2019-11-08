import React, { useEffect } from 'react';

// OpenLayers libraries
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';

// JSON data
import JsonOutline from '../../data/US-Outline.json';
import JsonStates from '../../data/US-States.json';
import JsonCounties from '../../data/US-Counties.json';
import JsonCongressional from '../../data/US-Congressional.json';

// Map Styling
import { outline, states, congressional, counties } from './layerStyles';

// Util
import generateVectorLayer from '../../utils/generateVectorLayer';

// CSS Styling
import './Map.css';
import 'ol/ol.css';

function OLMap() {

  // Generate map with layers
  useEffect(() => {

    // Map layers
    const UsCongressional = generateVectorLayer(JsonCongressional, congressional);
    const UsCounties = generateVectorLayer(JsonCounties, counties);
    const UsStates = generateVectorLayer(JsonStates, states);
    const UsOutline = generateVectorLayer(JsonOutline, outline);

    // Set layers as invisible for the map default
    UsOutline.setVisible(!UsOutline.getVisible());
    UsStates.setVisible(!UsStates.getVisible());
    UsCounties.setVisible(!UsCounties.getVisible());
    UsCongressional.setVisible(!UsCongressional.getVisible());

    // Generate OpenLayers map
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        UsCongressional,
        UsStates,
        UsCounties,
        UsOutline
      ],
      target: 'map',
      view: new View({
        // Change the projection to set the the coords as LAT/LNG
        projection: 'EPSG:4326',
        // Added this renderer for faster loading
        renderer: ('webgl'),
        center: [-97.922211, 39.381266],
        zoom: 4
      })
    });

    // On every on click the button, the map updates with the selected outline
    document.getElementById('outline').onclick = function () {
      UsOutline.setVisible(!UsOutline.getVisible());
    };
    document.getElementById('states').onclick = function () {
      UsStates.setVisible(!UsStates.getVisible());
    };
    document.getElementById('counties').onclick = function () {
      UsCounties.setVisible(!UsCounties.getVisible());
    };
    document.getElementById('congressional').onclick = function () {
      UsCongressional.setVisible(!UsCongressional.getVisible());
    };

  })
  return (
    <div>
      <h2>U.S.A Map Outline</h2>
      <button id="outline">Show US Outline</button>
      <button id="states">Show US States</button>
      <button id="counties">Show US Counties</button>
      <button id="congressional">Show US Congressional</button>
      <div id="map" className="map"></div>
    </div>
  )
}
export default OLMap;