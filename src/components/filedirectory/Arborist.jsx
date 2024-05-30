// 1: Uncontrolled Tree
import { useEffect, useRef, useState } from "react";

import { Tree } from "react-arborist";
import { data } from "./fileDirectory.data";

import Node from "./Node";

import { TbFolderPlus } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";

import { SiHtml5, SiJavascript, SiCss3, SiMarkdown } from "react-icons/si";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import useResizeObserver from "use-resize-observer";

import { IoLogoJavascript } from "react-icons/io";

const Arborist = () => {
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

  // useEffect(() => {
  //   console.log(dataTree);
  // }, [dataTree]);

  const onRename = ({ id, name }) => {
    const node = treeRef.current.get(id);
    if (node) {
      if (name.includes("html")) {
        node.data.icon = SiHtml5;
      }
      node.data.name = name;
    }
  };

  const createFileFolder = (
    <>
      <button
        onClick={() => treeRef.current.createInternal()}
        title="New Folder..."
      >
        <TbFolderPlus />
      </button>
      <button onClick={() => treeRef.current.createLeaf()} title="New File...">
        <AiOutlineFileAdd />
      </button>
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
      <div className="folderFileActions">{createFileFolder}</div>
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
        // openByDefault={false}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {Node}
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

export default Arborist;
