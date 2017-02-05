import React from 'react';
import _ from 'lodash';
import * as d3 from "d3";

class d3Chart extends React.Component {
  createD3Chart = () => {

    var margin = {top: 60, right: 70, bottom: 120, left: 70},
        paddingBottom = -100,
        paddingLeft = -50,
        width = window.innerWidth - margin.left - margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(".app").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    var data = this.props.loadData;

    data.forEach(function(d) {
        d.date = parseTime(d[0]);
        d.close = +d[1];
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("fill", "none")
        .attr("stroke", "#6DCAD5")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the Axis labels
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (paddingLeft/2) +","+(height/2)+")rotate(-90)")
        .text("Temp C");

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (width/2) +","+(height-(paddingBottom/3))+")")
      .text("Time");

  }

  // componentDidMount() {
  //   this.createD3Chart();
  // }

  componentDidUpdate() {
    this.createD3Chart();
  }

  render() {
    return (
      <div className="Chart" style={{ width: '100%', height: '80%' }}></div>
    );
  }
}

export default d3Chart;
