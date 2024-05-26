// 1: Uncontrolled Tree
import { useRef, useState } from "react";

import { Tree } from "react-arborist";
import { data } from "./fileDirectory.data";

import Node from "./Node";

import { TbFolderPlus } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";

import { SiHtml5, SiJavascript, SiCss3, SiMarkdown } from "react-icons/si";
import useResizeObserver from "use-resize-observer";

const Arborist = () => {
  const [term, setTerm] = useState("");
  const treeRef = useRef(null);

  const onCreate = ({ parentId, index, type }) => {};

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
        initialData={data}
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

export default Arborist;
