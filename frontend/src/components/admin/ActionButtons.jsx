import { Link } from "react-router-dom";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import Button from "../ui/Button";

const ActionButtons = ({ viewTo, editTo, onDelete, showView = true, showEdit = true, showDelete = true }) => (
  <div className="flex items-center gap-1">
    {showView && viewTo && (
      <Link to={viewTo} title="View">
        <Button variant="outline" size="sm" className="!px-2">
          <FiEye className="h-4 w-4" />
        </Button>
      </Link>
    )}
    {showEdit && editTo && (
      <Link to={editTo} title="Edit">
        <Button variant="outline" size="sm" className="!px-2">
          <FiEdit2 className="h-4 w-4" />
        </Button>
      </Link>
    )}
    {showDelete && onDelete && (
      <Button variant="danger" size="sm" className="!px-2" onClick={onDelete} title="Delete">
        <FiTrash2 className="h-4 w-4" />
      </Button>
    )}
  </div>
);

export default ActionButtons;
