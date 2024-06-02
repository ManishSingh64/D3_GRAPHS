import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
const DUMMY_DATA = [
  { id: "d1", value: 10, region: "USA" },
  { id: "d2", value: 11, region: "INDIA" },
  { id: "d3", value: 12, region: "CHINA" },
  { id: "d4", value: 6, region: "GERMANY" },
];
const D31 = () => {
  const graphRef = useRef(null);
  useEffect(() => {
    // d3.select(".d3-container")
    //   .selectAll("p")
    //   .data([1, 2, 3])
    //   .enter()
    //   .append("p")
    //   .text((data) => data * 2);
    // d3.select(".d3-container")
    //   .selectAll("div") // selectAll will add these divs inside d3-container
    //   .data(DUMMY_DATA)
    //   .enter()
    //   .append("div")
    //   .attr("class", "bar")
    //   .style("background", "pink")
    //   .sstyle("width", "50px")
    //   .style("height", (data) => data.value * 15 + "px");

    const svg = d3
      .select("svg")
      .selectAll("rect") // selectAll will add these rects inside d3-container
      .data(DUMMY_DATA)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "pink")
      .attr("width", "50px")
      .attr("height", (data) => data.value * 15 + "px");
  }, []);

  return (
    <div
      ref={graphRef}
      style={{
        border: "1px solid red",
        // display: "flex",
        // justifyContent: "space-evenly",
      }}
    >
      <svg />
    </div>
  );
};

export default D31;
