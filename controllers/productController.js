import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Camiseta Hombre',
        price: 500,
        user: req.user.id,
        image: 'https://dafitistaticco-a.akamaihd.net/p/kuva-3248-0791841-1-zoom.jpg',
        description: 'New Product',
        brand: 'Kulnois',
        category: 'ropa',
        countInStock: 20,

    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Erro('Product not found')
    }
})

export {
    getProducts,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct
}