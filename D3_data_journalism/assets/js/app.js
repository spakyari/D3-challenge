function print(content) {
    console.log(content)
}

d3.csv("./assets/data/data.csv").then(function (data) {

    var poverty = data.map(row=>{return parseInt(row.poverty)});
    var healthcare = data.map(row=>{return parseInt(row.healthcare)});
    var age = data.map(row=>{return parseInt(row.age)});
    var smokes = data.map(row=>{return parseInt(row.smokes)});

    // Define SVG area dimensions
    var svgWidth = 1200;
    var svgHeight = 660;

    // Define the chart's margins as an object
    var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
    };

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


    // Select body, append SVG area to it, and set the dimensions
    var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Create a linear scale for the horizontal axis.
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(poverty))
    .range([0, chartWidth]);

    // Create a linear scale for the horizontal axis.  

    var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(healthcare))
    .range([chartHeight, 0]);

    print(`max poverty ${d3.max(poverty)}`)
    print(`max healthcare ${d3.max(healthcare)}`)
    print(poverty)
    print(healthcare)


  // Create two new functions passing our scales in as arguments

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

    // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

//   Create one SVG rectangle per piece of tvData
//   Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".stateCircle")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "stateCircle")
  .attr("cx", d => xLinearScale(parseInt(d.poverty)))
  .attr("cy", d => yLinearScale(parseInt(d.healthcare)))
  .attr("r", 20);


})
