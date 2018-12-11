require("expose-loader?THREE!three");
require("expose-loader?$!jquery");
require("expose-loader?echarts!echarts");
require("expose-loader?d3!d3");

echarts.util.mapData = {};
echarts.util.mapData.params = require('../utils/mapData/params');