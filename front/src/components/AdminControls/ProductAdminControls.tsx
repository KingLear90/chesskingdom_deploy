import { ProductAdminControlsProps } from "../../types/interfaces"
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ProductAdminControls: React.FC<ProductAdminControlsProps> = ({ onEdit, onDelete }) => {
    const userProfile = localStorage.getItem('profile');

    if (!userProfile || userProfile !== 'admin') {
      return null;
    }
  return (
    <div className="product-controls">
        <IconButton onClick={onEdit}><Edit /></IconButton>
        <IconButton onClick={onDelete}><Delete /></IconButton>
    </div>
  )
}

export default ProductAdminControls;
