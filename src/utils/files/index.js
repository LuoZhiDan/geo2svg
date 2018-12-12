
var gs = require('../mapData/rawData/geoJson/chong_qing_geo.json');
var gsUtils = require('gs-utils-zdluoa');
gsUtils.toFile( gs, './public/svg.json' );