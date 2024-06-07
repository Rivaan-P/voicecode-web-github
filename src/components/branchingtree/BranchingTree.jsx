import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import conversationDatas from "./branchingTree.data";
import { database } from "@/firebase";
import { ref, onValue, set } from "firebase/database";
import { Button } from "../ui/button";

const useTriggerClickOnClassExistence = (className) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.dispatchEvent(new MouseEvent("click"));
        clearInterval(intervalId);
      }
    }, 100); // Check every 100 milliseconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [className]);
};

const BranchingTree = ({ onClickTree, currentBranch, setCurrentBranch }) => {
  const svgRef = useRef();
  const [currentNode, setCurrentNode] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [conversationData, setConversationData] = useState(null);
  const [deepestNode, setDeepestNode] = useState(null);
  // const [currentBranch, setCurrentBranch] = useState(null);
  //i need to store the conversation "history" ...still figuring out how that will look like
  // const [conversation, setConversation] = useState(conversationData);
  const nameRandom = localStorage.getItem("nameRandom");

  useTriggerClickOnClassExistence("deepest-node");

  useEffect(() => {
    const dbRef = ref(database, nameRandom);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      if (data) {
        setConversationData(data);
        setCurrentBranch(data[data.length - 1].index);
      } else {
        set(dbRef, [
          {
            index: 0,
            content: [
              {
                user: "",
                ai: "",
              },
            ],

            parentID: "null",
          },
        ]);
        setCurrentBranch(0);
      }
    });
  }, []);

  const newBranchOnClick = () => {
    const intCurrentBranch = +currentBranch;
    const newBranch = +deepestNode + 1;
    const newBranchData = {
      index: newBranch.toString(),
      parentID: intCurrentBranch.toString(),
      content: [
        {
          user: "",
          ai: "",
        },
      ],
    };

    console.log([...conversationData, newBranchData]);

    const dbRef = ref(database, nameRandom);
    // const content = [...conversationData, newBranchData];

    // // Add new messages to the database
    set(dbRef, [...conversationData, newBranchData]);

    setCurrentBranch(newBranch);
    console.log("currentBranch", newBranch);
  };

  const buildTree = (nodes) => {
    const root = nodes.find((node) => node.parentID === "null");
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
    if (conversationData) {
      const nodes = conversationData.map((data) => ({
        index: data.index,
        content: data.content,
        parentID: data.parentID,
        children: [],
      }));

      const rootNode = buildTree(nodes);
      setTreeData(rootNode);

      const root = d3.hierarchy(rootNode);
      const treeLayout = d3.tree().size([500, 400]);
      treeLayout(root);

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const g = svg.append("g").attr("transform", "translate(-80, 50)");

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
          setCurrentBranch(d.data.index);

          onClickTree(getContentSortedFromHighestParent(d));
          // onClickTree(collectData(d));
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

      // Find the deepest branch node
      let deepestNode = root.descendants()[0]; // Assuming the root is the first node
      root.descendants().forEach((node) => {
        if (node.data.index > deepestNode.data.index) {
          deepestNode = node;
        }
      });
      console.log("deepestNode", deepestNode);
      setDeepestNode(deepestNode.data.index);

      // Add a class to the deepest node for styling or identification
      if (deepestNode) {
        const deepestNodeElement = d3
          .select(svgRef.current)
          .selectAll("g")
          .filter((d) => d === deepestNode);

        if (deepestNodeElement) {
          deepestNodeElement.classed("deepest-node", true);
        }
      }
    }
  }, [conversationData]);

  return (
    <div className=" h-full  w-full">
      <div className="flex justify-between items-center">
        <Button onClick={newBranchOnClick} className="ml-4 mt-4">
          +Branch
        </Button>
        <div className=" mr-4 mt-4 branch-info">
          {currentNode && (
            <p>
              Current Branch Path:{" "}
              {getBranchPath(currentNode, conversationData).join(" -> ")}
            </p>
          )}
        </div>
      </div>
      <div className="mapFrame">
        <svg ref={svgRef} width={"350px"} height={"500px"}></svg>
      </div>

      <div>tes</div>
    </div>
  );
};

// function collectData(node) {
//   let result = [];

//   // Function to recursively traverse the object
//   function traverse(node) {
//     if (node) {
//       // Traverse the parent first (to ensure data from the highest parent is collected first)
//       if (node.parent) {
//         traverse(node.parent);
//       }
//       // Collect the current node's ai and user data
//       result.push({
//         content: node.data.user,
//         role: "user",
//         createdAt: new Date("2024-05-30T01:48:18.000Z"),
//         id: Math.random().toString(20).substr(2, 6),
//       });
//       result.push({
//         content: node.data.ai,
//         role: "assistant",
//         createdAt: new Date("2024-05-30T01:48:19.000Z"),
//         id: Math.random().toString(20).substr(2, 6),
//       });
//     }
//   }

//   traverse(node);
//   return result;
// }

function getContentSortedFromHighestParent(obj) {
  let result = [];
  function recurse(current) {
    if (current.parent) {
      recurse(current.parent);
    }
    current.data.content.forEach((item) => {
      if (item.user !== "") {
        result.push({
          content: item.user,
          role: "user",
          createdAt: new Date("2024-05-30T01:48:18.000Z"),
          id: Math.random().toString(20).substr(2, 6),
        });
        result.push({
          content: item.ai,
          role: "assistant",
          createdAt: new Date("2024-05-30T01:48:19.000Z"),
          id: Math.random().toString(20).substr(2, 6),
        });
      }
    });
  }
  recurse(obj);
  return result;
}

export default BranchingTree;
