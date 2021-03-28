import express from 'express'

import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct} from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts)

export default router