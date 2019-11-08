import React, { useEffect } from 'react';
import './Map.css';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import { transform } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import JsonOutline from './Us-Outline.json';
import JsonStates from './Us-States.json';
import JsonCounties from './US-counties.json';
import JsonCongressional from './Us-Congressional.json';
import Test from './test.json'



function OLMap() {

  const image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 })
  });
  const styles = {
    'LineString': new Style({
      stroke: new Stroke({
        color: 'rgba(43, 45, 66, 0.9)',
        width: 2
      })
    })

  };
  const styles2 = {
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'rgba(141,153,174 0.9)',
        width: 2
      })
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'rgba(141,153,174, 0.9)',
        width: 2
      })
    }),

  };
  const styles3 = {
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'rgba(217,4,41, 0.7)',
        width: 2
      })

    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'rgba(217,4,41, 0.7)',
        width: 2
      })
    }),

  };
  const styles4 = {
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'rgba(239,35,60, 0.3)',
        width: 1
      })
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'rgba(239,35,60, 0.3)',
        width: 1
      })
    }),

  };

  useEffect(() => {

    const styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };
    const styleFunction2 = function (feature) {
      return styles2[feature.getGeometry().getType()];
    }
    const styleFunction3 = function (feature) {
      return styles3[feature.getGeometry().getType()];
    }
    const styleFunction4 = function (feature) {
      return styles4[feature.getGeometry().getType()];
    }

    const vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonOutline)
    });

    const UsOutline = new VectorLayer({
      source: vectorSource,
      style: styleFunction,

    });


    const vectorSource1 = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonStates)
    });

    const UsStates = new VectorLayer({
      source: vectorSource1,
      style: styleFunction2,
    });


    const vectorSource2 = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonCounties)
    });

    const UsCounties = new VectorLayer({
      source: vectorSource2,
      style: styleFunction4,

    });


    const vectorSource3 = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonCongressional)
    });

    const UsCongressional = new VectorLayer({
      source: vectorSource3,
      style: styleFunction3,

    });

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
        projection: 'EPSG:4326',
        renderer: ('webgl'),
        center: [-97.922211, 39.381266],
        zoom: 3
      })
    });


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
      <h2></h2>
      <button id="outline">Show US Outline</button>
      <button id="states">Show US States</button>
      <button id="counties">Show US Counties</button>
      <button id="congressional">Show US Congressional</button>
      <div id="map" className="map"></div>
    </div>
  )
}
export default OLMap;