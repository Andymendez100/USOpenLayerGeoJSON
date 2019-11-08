import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorLayer } from 'ol/layer';

/**
 * Generate a vector layer to be used with
 * OpenLayers map
 * @param {object} data - JSON file used for the vector source
 * @param {object} style - Object that contains styling for layer
 * @returns {VectorLayer}
 */

const generateVectorLayer = (data, style) => {
    const vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(data)
    });

    return new VectorLayer({
        source: vectorSource,
        style: (feature) => style[feature.getGeometry().getType()],
    });
}

export default generateVectorLayer;