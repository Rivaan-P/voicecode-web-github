import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { MdArrowRight, MdArrowDropDown, MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiChat1 } from "react-icons/ci";

const SessionsNode = ({ node, style, dragHandle, tree }) => {
  const CustomIcon = node.data.icon;
  const iconColor = node.data.iconColor;
  return (
    <div
      className={`node-container ${node.state.isSelected ? "isSelected" : ""}`}
      style={style}
      ref={dragHandle}
    >
      <div
        className="node-content"
        onClick={() => node.isInternal && node.toggle()}
      >
        {node.isLeaf ? (
          <>
            <span className="arrow"></span>
            <span className="file-folder-icon">
              {CustomIcon ? (
                <CustomIcon color={iconColor ? iconColor : "#6bc7f6"} />
              ) : (
                <CiChat1 />
              )}
            </span>
          </>
        ) : (
          <>
            <span className="arrow">
              {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
            </span>
            <span className="file-folder-icon">
              {CustomIcon ? (
                <CustomIcon color={iconColor ? iconColor : "#f6cf60"} />
              ) : node.isOpen ? (
                <AiFillFolderOpen />
              ) : (
                <AiFillFolder />
              )}
            </span>
          </>
        )}
        <span className="node-text">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === "Escape") node.reset();
                if (e.key === "Enter") {
                  node.submit(e.currentTarget.value);
                }
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>

      <div className="file-actions">
        <div className="folderFileActions">
          <button onClick={() => node.edit()} title="Rename...">
            <MdEdit />
          </button>
          <button onClick={() => tree.delete(node.id)} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionsNode;
