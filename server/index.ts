import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import express from 'express'
import routers from './routes'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({
  path: 'config/.env'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1/shippingAddress', routers.shippingAddress)
app.use('/api/v1/province', routers.province)
app.use('/api/v1/checkout', routers.checkout)
app.use('/api/v1/district', routers.district)
app.use('/api/v1/saved', routers.saved)
app.use('/api/v1/user', routers.user)
app.use('/api/v1/cart', routers.cart)
app.use('/api/v1/city', routers.city)

connectDB()
app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))