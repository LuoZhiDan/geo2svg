const fs = require('fs');
const axios = require('axios');

var city = 'chongqing';

axios.get(`https://data.jianshukeji.com/geochina/${city}.js`).then(res => {
    var str = res.data.replace(/Highcharts\.maps\[".+"?]=/, '');
    var data = JSON.parse(str);
    var geojson = {
        "title": data.title,
        "type": "FeatureCollection",
        "features": []
    }

    data.features.map((item) => {
        convert(item);
        geojson.features.push({
            "type": "Feature",
            "properties": {
                "name": item.properties.fullname,
                "childrenNum": 11,
                "cp": item.properties.center,
            },
            "geometry": item.geometry,
        });
    });

    fs.writeFile('./files/city.json', JSON.stringify(geojson), (err) => {
        if (err) {
            console.log(err);
        }
        console.log("success!");
    });
});



function convert(item) {
    var center = item.properties.center;
    var cp = item.properties.cp;
    var xs = center[0] / cp[0];
    var ys = center[1] / cp[1];
    var coordinates = item.geometry.coordinates;


    coordinates.map(item => {
        if (typeof item[0] !== 'number') {
            item.map(ite => {
                if (typeof ite[0] !== 'number') {
                    ite.map(it => {
                        if (typeof it[0] == 'number') {
                            it[0] *= xs;
                            it[1] *= ys;
                        }
                    })
                }
            })
        }
    })
}

