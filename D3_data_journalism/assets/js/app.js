function print(content) {

}

d3.csv("./assets/data/data.csv").then(function (dataset) {



DrawScatter(dataset, 'body', 'poverty', 'healthcare', ['In Poverty (%)', 'Lacks Healthcare(%)'])
DrawScatter(dataset, 'body', 'age', 'smokes', ['Age', 'Smokes'])


})

function DrawScatter(data, onto, x , y, Axis_labels) {

    var X = data.map(row=>{return parseFloat(row[x])});
    var Y = data.map(row=>{return parseFloat(row[y])});


    // Define SVG area dimensions
    var svgWidth = 1200;
    var svgHeight = 1200;

    // Define the chart's margins as an object
    var chartMargin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50
    };

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


    // Select body, append SVG area to it, and set the dimensions
    var svg = d3.select(onto)
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Create a linear scale for the horizontal axis.
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(X)*0.80, d3.max(X)*1.1])
    .range([0, chartWidth])


    // Create a linear scale for the horizontal axis.  

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(Y)*0.80,d3.max(Y)*1.1])
    .range([chartHeight, 0])


  // Create two new functions passing our scales in as arguments

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

    // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
  .attr("transform", `translate(${chartMargin.left}, 0)`)
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartHeight})`)
    .call(bottomAxis);

//   Create one SVG rectangle per piece of tvData
//   Use the linear and band scales to position each rectangle within the chart

var radius = 15

  chartGroup.selectAll(".stateCircle")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "stateCircle")
  .attr("cx", d => xLinearScale(parseFloat(d[x])))
  .attr("cy", d => yLinearScale(parseFloat(d[y])))
  .attr("r", radius)
  
chartGroup.selectAll(".stateText")
  .data(data)
  .enter()
  .append('text')
  .attr("class", "stateText")
  .attr("x", d => xLinearScale(parseFloat(d[x])))
  .attr("y", d => yLinearScale(parseFloat(d[y]))+5)
  .text(d => {return d.abbr})

  chartGroup.append("text")
    // Position the text
    // Center the text:
    // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.bottom - 5})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .text(Axis_labels[0]);

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - chartMargin.left + 40)
  .attr("x", 0 - (chartHeight / 2))
  .attr("dy", "1em")
  .text(Axis_labels[1]);

  

}
