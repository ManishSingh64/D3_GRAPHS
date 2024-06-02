import React, { useEffect } from "react";
import * as d3 from "d3";
const data = [
  { year: 2000, desktops: 80, laptops: 210, printers: 50, monitors: 60 },
  { year: 2001, desktops: 130, laptops: 150, printers: 30, monitors: 40 },
  { year: 2002, desktops: 40, laptops: 200, printers: 45, monitors: 80 },
  { year: 2003, desktops: 70, laptops: 180, printers: 65, monitors: 70 },
  { year: 2004, desktops: 100, laptops: 160, printers: 70, monitors: 40 },
  { year: 2005, desktops: 90, laptops: 190, printers: 80, monitors: 60 },
];

const StackedArea = () => {
  const width = 600,
    height = 500,
    spacing = 60;

  useEffect(() => {
    const container = d3.select(".stackarea-container");
    container.selectAll("svg").remove();
    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => {
          return d.year;
        }),
        d3.max(data, (d) => {
          return d.year;
        }),
      ])
      .range([0, width - spacing]);

    const yScale = d3.scaleLinear().range([height - spacing, 0]);
    console.log("here");
    const svg = container
      .append("svg")
      // .style("border", "1px solid")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${spacing / 2}, ${spacing / 2})`);

    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height - spacing})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(6)
          // .tickSizeInner(0)
          .tickFormat(d3.format("d"))
      );

    xAxis.selectAll(".tick text").style("fill", "red");
    xAxis.selectAll(".tick line").style("stroke", "blue");

    const stack = d3
      .stack()
      .keys(["desktops", "laptops", "printers", "monitors"]);

    const colors = ["dodgerblue", "silver", "pink", "purple"];
    const stackedData = stack(data);
    // console.log(stackedData[stackedData.length - 1]);
    yScale.domain([
      0,
      d3.max(stackedData[stackedData.length - 1], (d) => {
        return d[1];
      }),
    ]);
    // .range([width - spacing - 100, 0]);  // don't need range in yscale

    svg.append("g").call(d3.axisLeft(yScale));

    const area = d3
      .area()
      .x((d) => xScale(d.data.year))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]));

    const seris = svg
      .selectAll("g.seris")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "seris");

    seris
      .append("path")
      .style("fill", (d, i) => {
        return colors[i];
      })
      .attr("d", (d) => {
        return area(d);
      });
  }, []);

  const handleMouseEnter = (e) => {
    console.log(e);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
      }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        className="stackarea-container"
        style={{ border: "1px solid red" }}
      ></div>
    </div>
  );
};
export default StackedArea;
