
var gs = require('../mapData/rawData/geoJson/chong_qing_geo.json');
var d3 = require('d3');
var fs = require('fs');
var width = 1024;
var height = 1024;
var padding = 10;

projection = d3.geoMercator()
projection.fitExtent([[padding, padding], [width - padding * 2, height - padding * 2]], gs);
path = d3.geoPath(projection);

var result = [];

gs.features.map( (d, i) => {
    result.push({
        _id: '_path_' + i,
        name: d.properties.name,
        center: projection(d.properties.cp),
        path: path(d)
    });
})

fs.writeFile('./src/dist/svg.json', JSON.stringify({
    "type": "FeatureCollection",
    features: result
}), err=>{
    if(err){
        console.log(err)
    }
    console.log("success!");
});