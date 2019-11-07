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
function OLMap() {
  useEffect(() => {
    var image = new CircleStyle({
      radius: 5,
      fill: null,
      stroke: new Stroke({ color: 'red', width: 1 })
    });
    var styles = {
      'Point': new Style({
        image: image
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 10
        })
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1
        })
      }),
      'MultiPoint': new Style({
        image: image
      }),
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)'
        })
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)'
        })
      }),
      'GeometryCollection': new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2
        }),
        fill: new Fill({
          color: 'magenta'
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta'
          })
        })
      }),
      'Circle': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)'
        })
      })
    };
    var styles2 = {
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)'
        })
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)'
        })
      }),

    };
    var styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };
    var styleFunction2 = function (feature) {
      return styles2[feature.getGeometry().getType()];
    }

    var vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonOutline)
    });

    var UsOutline = new VectorLayer({
      source: vectorSource,
      style: styleFunction
    });


    var vectorSource1 = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonStates)
    });

    var UsStates = new VectorLayer({
      source: vectorSource1,
      style: styleFunction2
    });


    var vectorSource2 = new VectorSource({
      features: (new GeoJSON()).readFeatures(JsonCounties)
    });

    var UsCounties = new VectorLayer({
      source: vectorSource2,
      style: styleFunction
    });

    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        UsOutline,
        UsStates,
        UsCounties
      ],
      target: 'map',
      view: new View({
        projection: 'EPSG:4326',
        center: [-97.922211, 39.381266],
        zoom: 2
      })
    });
    document.getElementById('outline').onclick = function (value) {
      UsOutline.setVisible(!UsOutline.getVisible());
    };
    document.getElementById('states').onclick = function (value) {
      UsStates.setVisible(!UsStates.getVisible());
    };
    document.getElementById('counties').onclick = function (value) {
      UsCounties.setVisible(!UsCounties.getVisible());
    };


  })
  return (
    <div>
      <h2>My Map</h2>
      <button id="outline">Show US Outline</button>
      <button id="states">Show US States</button>
      <button id="counties">Show US Counties</button>
      <div id="map" className="map"></div>
    </div>
  )
}
export default OLMap;