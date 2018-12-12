

import gs from './utils/mapData/rawData/geoJson/chong_qing_geo.json';

var width = 1024;
var height = 1024;
var padding = 10;
var root;
var projection, path;

projection = d3.geoMercator()
projection.fitExtent([[padding, padding], [width - padding * 2, height - padding * 2]], gs);
path = d3.geoPath(projection);

update();

function update() {
    var g = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('viewBox', '0 0 ' + width + ' ' + height + '')
        .append('g');

    g.selectAll("text")
        .data(gs.features)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .attr("fill", "#000")
        .style("font-size", "12px")
        .text(function (d) {
            return d.properties.name;
        })
        .attr("transform", function (d) {
            return "translate(" + projection(d.properties.cp).join(',') + ")";
        });

    g.selectAll("path")
        .data(gs.features)
        .enter()
        .append("path")
        .attr("stroke", "#00ffff")
        .attr("stroke-width", 1)
        .attr('data-name', function (d) {
            return d.properties.name;
        })
        .attr('center', function (d) {
            return projection(d.properties.cp);
        })
        .attr("fill", function (d, i) {
            return 'rgba(0,0,0,0)';
        })
        .attr("d", path)   //使用地理路径生成器
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("fill", "green");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", 'rgba(0,0,0,0)');
        });

    var nodes = d3.selectAll('path').nodes();
    var result = [];
    nodes.forEach(function (node, i) {
        result.push({
            _id: '_path_' + i,
            name: node.getAttribute('data-name'),
            center: JSON.parse('[' + node.getAttribute('center') + ']'),
            path: node.getAttribute('d')
        });
    });
    console.log(JSON.stringify(result));
}