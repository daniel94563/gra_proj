d3.csv("population.csv", function(data) {
var dataobj = { children: data };
var pack = d3.layout.pack();
pack = pack.padding(2).size([400,300]).sort(function(a,b) { return b.value - a.value; });
var nodes = pack.nodes(dataobj); //padding為泡泡間的距離 整張圖為400 150
nodes = nodes.filter(function(it) { return it.parent; });
var color = d3.scale.category20();


d3.select("svg").style({'width':'90%'})
  .selectAll("circle")                 // 建立 circle 的 Selection
  .data(nodes)                         // 綁定 selection 與資料
  .enter()                             // 對於任何沒被對應而落單的資料 ...
  .append("circle")                    // 新增一個 circle 標籤
  .attr({
    cx: function(it) { return it.x; }, // 用 x,y 當圓心
    cy: function(it) { return it.y; },
    r : function(it) { return it.r; }, // 用 r 當半徑
    fill: function(it) { return color(it.name); },
    stroke: "#444",                    // 邊框畫深灰色
  });

d3.select("svg").selectAll("text").data(nodes).enter()
  .append("text")
  .attr({
    x: function(it) { return it.x; },
    y: function(it) { return it.y; },
    "text-anchor": "middle",                    // 文字水平置中
  }).text(function(it)  { return (it.name); }); // 設定文字為國名

});