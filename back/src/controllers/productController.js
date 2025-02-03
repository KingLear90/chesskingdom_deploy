import product from "../models/productModel.js"

export const createProduct = async (req, res) => {
  try {
    const productData = new product(req.body);
    const { productName } = productData;
    const productExist = await product.findOne({ productName });

    if (productExist) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const savedProduct = await (await productData.save()).populate('category_id');
    res.status(201).json({message: "Product created", data: { savedProduct }});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export const getProduct = async (req, res) => {
  try {
    const allProducts = await product.find()
      .populate({
        path: 'category_id', 
        select: 'categoryName'
      })
    console.log('Products: ', allProducts);
    // Controlamos la longitud (nos aseguramos que tenga datos)
    if (allProducts.length === 0) {
        // 204: No content: No hay contenido, pese a que la respuesta tenga un status 200
      return res.status(204).json({ message: "No products found" });
    }
    res.status(200).json(allProducts); 
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productItem = await product.findById(req.params.id)
      .populate({path: 'category_id', select: 'categoryName'})
    console.log('Product: ',productItem);
    if (!productItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productExists = await product.findById( {_id} )

    if (!productExists) {
      res.status(404).json({message: 'Product not found"'});
      console.log(error)
    }

    const updatedProduct = await product.findByIdAndUpdate( {_id}, req.body, { new: true });
    console.log('Product updated successfully', updatedProduct);
    return res.status(201).json({ message: 'Product updated successfully', data: {updatedProduct} });
  } catch(error) {
    res.status(500).json({message: 'Internal server error', error: error})
  }
}

export const deleteProduct = async (req, res) => {
  try{
    const _id = req.params.id;
    const productExists = await product.findOne({_id});

    if (!productExists) {
      return res.status(404).json({message: 'Product not found'})
    }

    const deletedProduct = await product.findByIdAndDelete( { _id } );
    res.status(200).json({ message: 'Product deleted successfully', data: { deletedProduct} })
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Internal server error', error: error})
  }
}
