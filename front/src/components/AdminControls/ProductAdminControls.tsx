
import { ProductAdminControlsProps } from "../../types/interfaces"

const ProductAdminControls: React.FC<ProductAdminControlsProps> = ({ onEdit, onDelete }) => {
    const userProfile = localStorage.getItem('profile');

    if (!userProfile || userProfile !== 'admin') {
      return null;
    }
  return (
    <div className="product-controls">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Eliminar</button>
    </div>
  )
}

export default ProductAdminControls;
