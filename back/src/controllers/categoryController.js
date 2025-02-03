import category from "../models/categoryModel.js"

// CREATE CATEGORY
export const createCategory = async (req, res) => {
    try { 
      const newCategory = new category(req.body);
      console.log(req.body);

      const { categoryName } = newCategory;
      const categoryExist = await category.findOne({ categoryName });

      if (categoryExist) {
        return res.status(400).json({message: 'Category already exists.'})
      }
      const savedCategory = await newCategory.save();
      return res.status(201).json({message: 'Category created', data : { savedCategory }});

    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Internal server error', error});
    }
  }

//  GET CATEGORY
export const getCategory = async (req, res) => {
  try { 
    const allCategories = await category.find()

    if (allCategories.length === 0) {
      return res.status(204).json({message: 'No categories found'});
    }
    return res.status(200).json(allCategories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error', error});
  }
}

// GET CATEGORY BY ID 
export const getCategoryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const idExists = await category.findOne({ _id });
    const {categoryName} = idExists

    if (!idExists) {
      return res.status(404).json({message: 'Category ID not found'})
    }

    console.log('Category:', categoryName)
    return res.status(200).json({message: 'Category found', categoryName})
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error', error})
  }
}

// DELETE CATEGORY 
export const deleteCategory = async (req, res) => {
  try {
    const _id = req.params.id; 
    const categoryExists = await category.findOne({ _id });
    if (!categoryExists) {
      return res.status(404).json({message: 'Category not found'});
    }
    const deletedCategory = await category.findByIdAndDelete( { _id } );
    res.status(200).json({ message: 'Category deleted successfully', data: deletedCategory });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error', error});
  }
}

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const categoryExists = await category.findOne({ _id });
    if (!categoryExists) {
      return res.status(404).json({message: 'Category not found'});
    }
    const updatedCategory = await category.findByIdAndUpdate({_id}, req.body, {new: true});
    console.log('Category updated successfully', updatedCategory);
    return res.status(201).json({message: 'Category updated successfully', data: { updatedCategory }});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error', error});
  }
}