import { Stroke, Style } from 'ol/style';

const outline = {
    'LineString': new Style({
        stroke: new Stroke({
            color: 'rgba(43, 45, 66, 0.9)',
            width: 1
        })
    })
};

const states = {
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'rgb(141,153,174 )',
            width: 2
        })
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'rgb(141,153,174)',
            width: 2
        })
    }),
};

const congressional = {
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

const counties = {
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

export {
    outline,
    states,
    congressional,
    counties,
}
