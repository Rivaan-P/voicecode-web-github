// 1: Uncontrolled Tree
import { useEffect, useRef, useState } from "react";

import { Tree } from "react-arborist";
import { data } from "./Sessions.data";

import SessionsNode from "./NodeSessions";

import { TbFolderPlus } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";

import { SiCss3 } from "react-icons/si";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import useResizeObserver from "use-resize-observer";

import { database } from "@/firebase";
import { ref, onValue, set } from "firebase/database";

import { IoLogoJavascript } from "react-icons/io";
import { index } from "d3";

const SessionsArborist = () => {
  const handleDirectoryUpload = (event) => {
    const files = event.target.files;
    const paths = [];

    for (let i = 0; i < files.length; i++) {
      paths.push(files[i].webkitRelativePath);
    }

    const tree = buildTree(paths);
    const json = convertTreeToJson(tree);
    setDataTree(json);
  };

  const inputDirectoryTree = useRef(null);
  const [term, setTerm] = useState("");
  const [dataTree, setDataTree] = useState(data);
  const treeRef = useRef(null);

  const nameRandom = localStorage.getItem("nameRandom");

  // useEffect(() => {
  //   const dbRef = ref(database, nameRandom);
  //   onValue(dbRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       setDataTree(data);
  //     } else {
  //       set(dbRef, [
  //         {
  //           id: "1",
  //           name: "project 1",
  //           sessionsContent: [
  //             {
  //               index: 0,
  //               content: [
  //                 {
  //                   user: "",
  //                   ai: "",
  //                 },
  //               ],
  //               parentID: "null",
  //             },
  //           ]
  //         },
  //       ]);
  //     }
  //   });
  // }, []);

  const onRename = ({ id, name }) => {
    const node = treeRef.current.get(id);
    if (node) {
      node.data.name = name;
      setDataTree(dataTree);
    }
  };

  const onDelete = ({ ids }) => {
    setDataTree(dataTree.filter((n) => !ids.includes(n.id)));
  };

  const createFileFolder = (
    <>
      {/* <button
        onClick={() => treeRef.current.createInternal()}
        title="New Folder..."
      >
        <TbFolderPlus />
      </button>
      <button onClick={() => treeRef.current.createLeaf()} title="New File...">
        <AiOutlineFileAdd />
      </button> */}
      <button
        onClick={() => inputDirectoryTree.current.click()}
        title="Upload Directory..."
      >
        <MdOutlineDriveFolderUpload />
        <input
          ref={inputDirectoryTree}
          className="hidden"
          type="file"
          webkitdirectory="true"
          multiple
          onChange={handleDirectoryUpload}
        />
      </button>
    </>
  );

  const { ref, width, height } = useResizeObserver();

  return (
    <div ref={ref}>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Tree
        ref={treeRef}
        data={dataTree}
        indent={24}
        rowHeight={32}
        width={width}
        onRename={onRename}
        onDelete={onDelete}
        // openByDefault={false}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {SessionsNode}
      </Tree>
    </div>
  );
};

const getFileIcon = (fileName) => {
  if (fileName.endsWith(".js")) {
    return { icon: IoLogoJavascript, iconColor: "#42a5f5" };
  } else if (fileName.endsWith(".css")) {
    return { icon: SiCss3, iconColor: "#42a5f5" };
  } else {
    return { icon: null, iconColor: "#000" };
  }
};

const buildTree = (paths) => {
  const tree = {};
  paths.forEach((path) => {
    const parts = path.split("/");
    let current = tree;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = { id: null, name: part, children: {} };
      }
      current = current[part].children;
    });
  });
  return tree;
};

const convertTreeToJson = (tree) => {
  let idCounter = 0;

  const convertNode = (node) => {
    const children = Object.values(node.children).map(convertNode);

    // Sort children: directories first, then files
    children.sort((a, b) => {
      const aIsDir = a.children && a.children.length > 0;
      const bIsDir = b.children && b.children.length > 0;
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.name.localeCompare(b.name);
    });

    const { icon, iconColor } = getFileIcon(node.name);
    return {
      id: `id-${idCounter++}`,
      name: node.name,
      ...(icon && { icon }),
      ...(iconColor && { iconColor }),
      ...(children.length > 0 && { children }),
    };
  };

  return Object.values(tree).map(convertNode);
};

export default SessionsArborist;
