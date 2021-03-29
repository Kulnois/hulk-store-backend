import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import colors from 'colors'

import connectDB from './config/db.js'
import { notFount, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/api', (req, res) => {
    res.send('API is running Hulk Store...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')))
}

app.use(notFount)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server runnin ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))