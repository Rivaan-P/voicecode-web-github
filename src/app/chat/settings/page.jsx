"use client";
import React, { useState } from "react";
import { IoLogoJavascript } from "react-icons/io";
import { SiCss3 } from "react-icons/si";

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

const DirectoryUploader = () => {
  const [jsonStructure, setJsonStructure] = useState([]);

  const handleDirectoryUpload = (event) => {
    const files = event.target.files;
    const paths = [];

    for (let i = 0; i < files.length; i++) {
      paths.push(files[i].webkitRelativePath);
    }

    const tree = buildTree(paths);
    const json = convertTreeToJson(tree);
    setJsonStructure(json);
  };

  return (
    <div>
      <input
        type="file"
        webkitdirectory="true"
        multiple
        onChange={handleDirectoryUpload}
      />
      <pre>{JSON.stringify(jsonStructure, null, 2)}</pre>
    </div>
  );
};

export default DirectoryUploader;
