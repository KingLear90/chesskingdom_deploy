import './Products.css'
import App from '../../App'
import { useState, useEffect } from 'react'
import { Box, Button, IconButton, Modal, TextField } from '@mui/material'
import { Product } from '../../types/interfaces';
import { getAuthHeaders } from '../../utils/getAuthHeaders';
import ProductAdminControls from '../../components/AdminControls/ProductAdminControls';

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [editMode, setEditMode] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const initialUrl = import.meta.env.VITE_API_URL as string 
  
  const productsItems = async () => {
    try {
      const response = await fetch(`${initialUrl}product/get`, {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const removeProduct = async ( _id: string )  => {
    if (confirm('¿Eliminar producto?')) {
      try {
        const response = await fetch(`${initialUrl}product/delete/${_id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        })
        if (response.ok) {
          setProducts(products.filter((product: any) => product._id !== _id))
          productsItems()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setEditMode(true)
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProduct) {
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found')
      return
    }

    try {
      const response = await fetch(`${initialUrl}product/update/${selectedProduct._id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(selectedProduct)
      })
    
      if (response.ok) {
        setEditMode(false)
        await productsItems()
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
}

  useEffect(() => {
  productsItems() 
  }, [])

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'whitesmoke',
    boxShadow: 24,
    p: 4,
  }

  type Translations = Record<string, string>;

  const categoryTranslations: Translations = {
    books: "Libros",
    chessboards: "Tableros",
    "chess clocks": "Relojes de ajedrez",
    "chess sets": "Sets de ajedrez",
  };
  
  return (
    <App>
      <h4>Encuentra productos de tu interés: tableros, libros ¡y muchos más!</h4>
      <div className="productsContainer">
        {products &&
          products.map((product: Product) => {
            const categoryName = product.category_id?.categoryName || "";
            const translatedCategory =
              categoryTranslations[categoryName] || "Sin categoría definida";
  
            return (
              <div key={product._id} className="product-card">
                <h3>{product.productName}</h3>
                <img
                  src={product.url}
                  alt={product.productName}
                  onClick={() => window.open(product.url, "_blank")}
                  onError={() =>
                    alert(`Error al cargar la imagen, ${product.productName}`)
                  }
                />
                <p className="price">Precio: ${product.price}</p>
                <p className="description">{product.description}</p>
                <p className="category">Categoría: {translatedCategory}</p>
  
                <div className="button-group">
                  <ProductAdminControls
                    onEdit={() => handleEdit(product)} 
                    onDelete={() => removeProduct(product._id)}
                  />
                </div>
  
                <Modal open={editMode} onClose={() => setEditMode(false)}>
                  <Box sx={modalStyle}>
                    <form onSubmit={handleUpdate}>
                      <TextField
                        fullWidth
                        label="Nombre del producto"
                        margin="normal"
                        value={selectedProduct?.productName || ""}
                        onChange={(e) => {
                          if (selectedProduct) {
                            setSelectedProduct({
                              ...selectedProduct,
                              productName: e.target.value,
                            });
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Precio"
                        margin="normal"
                        value={selectedProduct?.price || ""}
                        onChange={(e) => {
                          if (selectedProduct) {
                            setSelectedProduct({
                              ...selectedProduct,
                              price: e.target.value,
                            });
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Descripción"
                        margin="normal"
                        multiline
                        rows={4}
                        value={selectedProduct?.description || ""}
                        onChange={(e) => {
                          if (selectedProduct) {
                            setSelectedProduct({
                              ...selectedProduct,
                              description: e.target.value,
                            });
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="URL de la imagen"
                        margin="normal"
                        value={selectedProduct?.url || ""}
                        onChange={(e) => {
                          if (selectedProduct) {
                            setSelectedProduct({
                              ...selectedProduct,
                              url: e.target.value,
                            });
                          }
                        }}
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Update Product
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </div>
            );
          })}
      </div>
    </App>
  );
}

export default Products;