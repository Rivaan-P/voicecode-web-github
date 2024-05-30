import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import conversationData from "./branchingTree.data";

const BranchingTree = ({ onClickTree }) => {
  const svgRef = useRef();
  const [currentNode, setCurrentNode] = useState(null);
  const [treeData, setTreeData] = useState(null);
  //i need to store the conversation "history" ...still figuring out how that will look like
  const [conversation, setConversation] = useState(conversationData);

  const buildTree = (nodes) => {
    const root = nodes.find((node) => node.parentID === null);
    const addChildren = (node) => {
      node.children = nodes.filter((n) => n.parentID === node.index);
      node.children.forEach(addChildren);
    };
    addChildren(root);
    return root;
  };

  const getBranchPath = (index, nodes) => {
    const path = [];
    let current = nodes.find((node) => node.index === index);
    while (current) {
      path.unshift(current.index);
      current = nodes.find((node) => node.index === current.parentID);
    }
    return path;
  };

  useEffect(() => {
    const nodes = conversationData.map((data) => ({
      index: data.index,
      user: data.user,
      ai: data.ai,
      parentID: data.parentID,
      children: []
    }));

    const rootNode = buildTree(nodes);
    setTreeData(rootNode);

    const root = d3.hierarchy(rootNode);
    const treeLayout = d3.tree().size([500, 400]);
    treeLayout(root);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", "translate(-50, 50)");

    g.append("g")
      .selectAll("line")
      .data(root.links())
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    // Nodes
    const node = g
      .append("g")
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => {
        setCurrentNode(d.data.index);
        // console.log(collectData(d));

        onClickTree(collectData(d));
      });

    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#333")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    node
      .append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((d) => d.data.index);
  }, [currentNode]);

  return (
    <div className=" mapFrame">
      <svg ref={svgRef} width={"400px"} height={"500px"}></svg>
      <div className="branch-info">
        {currentNode && (
          <p>
            Current Branch Path:{" "}
            {getBranchPath(currentNode, conversationData).join(" -> ")}
          </p>
        )}
      </div>
    </div>
  );
};

function collectData(node) {
  let result = [];

  // Function to recursively traverse the object
  function traverse(node) {
    if (node) {
      // Traverse the parent first (to ensure data from the highest parent is collected first)
      if (node.parent) {
        traverse(node.parent);
      }
      // Collect the current node's ai and user data
      result.push({
        content: node.data.user,
        role: "user",
        createdAt: new Date("2024-05-30T01:48:18.000Z"),
        id: "YLaOeA4",
      });
      result.push({
        content: node.data.ai,
        role: "assistant",
        createdAt: new Date("2024-05-30T01:48:19.000Z"),
        id: "YLaOeA5",
      });
    }
  }

  traverse(node);
  return result;
}

export default BranchingTree;