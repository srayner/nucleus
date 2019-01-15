import React from "react";
import styled from "styled-components";
import data from "../../data/sample-tree";
import * as d3 from "d3";

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 46px;
  width: 100%;
  height: 100%;
  background-color: rgb(94, 103, 112);
`;

function childPath(d) {
  return (
    "M" +
    d.source.x +
    "," +
    d.source.y +
    "v160" +
    "H" +
    d.target.x +
    "V" +
    d.target.y
  );
}

class Tree extends React.Component {
  state = {
    data: data
  };

  delta() {
    return (-d3.event.deltaY * (d3.event.deltaMode ? 120 : 1)) / 100;
  }

  componentDidMount() {
    var zoom = d3
      .zoom()
      .wheelDelta(this.delta)
      .on("zoom", handleZoom);

    function handleZoom() {
      if (svg) {
        svg.attr("transform", d3.event.transform);
      }
    }

    const svg = d3
      .select("svg")
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity.translate(700, 50).scale(0.8))
      .append("g")
      .attr("transform", "translate(700,50)scale(.8,.8)")
      .attr("id", "tree-container");

    d3.select("#tree-container")
      .append("g")
      .attr("class", "links");
    d3.select("#tree-container")
      .append("g")
      .attr("class", "nodes");

    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  render() {
    return (
      <div>
        <Svg ref={el => (this.svgEl = el)} />
      </div>
    );
  }

  updateChart() {
    const root = d3.hierarchy(this.state.data);
    const tree = d3
      .tree()
      .nodeSize([100, 180])
      .separation(function(a, b) {
        return a.parent === b.parent ? 1 : 1.5;
      });

    tree(root);

    const node = d3
      .select("svg g.nodes")
      .selectAll("g.node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node");

    node
      .append("rect")
      .attr("x", function(d) {
        return d.x - 45;
      })
      .attr("y", function(d) {
        return d.y + 90;
      })
      .attr("width", 90)
      .attr("height", 50)
      .attr("fill", "white");

    node
      .append("image")
      .attr("x", function(d) {
        return d.x - 45;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .attr("width", 90)
      .attr("height", 90)
      .attr("href", function(d) {
        return d.data.gender === "Male" ? "male.png" : "female.png";
      });

    node
      .append("text")
      .attr("x", function(node) {
        return node.x;
      })
      .attr("y", function(node) {
        return node.y + 104;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .text(function(node) {
        return node.data.forenames;
      });
    node
      .append("text")
      .attr("x", function(node) {
        return node.x;
      })
      .attr("y", function(node) {
        return node.y + 118;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .text(function(node) {
        return node.data.surname;
      });
    node
      .append("text")
      .attr("x", function(node) {
        return node.x;
      })
      .attr("y", function(node) {
        return node.y + 134;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .text(function(node) {
        const birth = node.data.birth ? node.data.birth.year.toString() : "";
        const death = node.data.death
          ? " - " + node.data.death.year.toString()
          : "";
        return birth + death;
      });

    d3.select("svg g.links")
      .selectAll("line.link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("d", childPath)
      .attr("stroke", "#AEACA2")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }
}

export default Tree;