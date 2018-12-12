

import gs from './utils/mapData/rawData/geoJson/chong_qing_geo.json';

import toData from 'gs-utils-zdluoa/src/utils/toData';

var data = toData(gs);

var width = 1024;
var height = 1024;

update();

function update() {
    var g = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('viewBox', '0 0 ' + width + ' ' + height + '')
        .append('g');

    g.selectAll("text")
        .data(data.features)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .attr("fill", "#000")
        .style("font-size", "12px")
        .text(function (d) {
            return d.name;
        })
        .attr("transform", function (d) {
            return "translate(" + d.center.join(',') + ")";
        });

    g.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("stroke", "#00ffff")
        .attr("stroke-width", 1)
        .attr('data-name', function (d) {
            return d.name;
        })
        .attr('center', function (d) {
            return d.center;
        })
        .attr("fill", function (d, i) {
            return 'rgba(0,0,0,0)';
        })
        .attr("d", function(d){
            return d.path;
        }) 
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("fill", "green");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", 'rgba(0,0,0,0)');
        });

    console.log( JSON.stringify( data ) );
}