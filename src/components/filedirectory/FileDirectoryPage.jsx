import { Tree } from "react-arborist";
import { data } from "./fileDirectory.data";
import Arborist from "./Arborist";

const FileDirectoryPage = () => {
  return (
    <div className="sidebar">
      <Arborist />
    </div>
  );
};

export default FileDirectoryPage;
