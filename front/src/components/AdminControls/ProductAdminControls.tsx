
import { IconButton } from "@mui/material";
import { ProductAdminControlsProps } from "../../types/interfaces"

const ProductAdminControls: React.FC<ProductAdminControlsProps> = ({ onEdit, onDelete }) => {
    const userProfile = localStorage.getItem('profile');

    if (!userProfile || userProfile !== 'admin') {
      return null;
    }
  return (
    <div className="product-controls">
        <IconButton onClick={onEdit}>Editar</IconButton>
        <IconButton onClick={onDelete}>Eliminar</IconButton>
    </div>
  )
}

export default ProductAdminControls;
