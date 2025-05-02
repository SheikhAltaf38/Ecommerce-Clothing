const mongoose = require("mongoose");
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const dbconnect= require("./config/db")

const authRouter = require("./routes/authRoutes/authRoutes")

const adminProductsRouter = require("./routes/admin/product-routes")
const adminOrderRouter = require("./routes/admin/orderRoutes")

const shopProductsRouter= require("./routes/shop/product-routes")
const shopCartRouter = require("./routes/shop/cart-routes")
const shopProductReviewRouter = require("./routes/shop/reviewRoutes")
const shopAddressRouter= require('./routes/shop/address-routes')
const shopOrderRouter = require("./routes/shop/orderRoutes")
const shopSearchRouter = require("./routes/shop/search-routes")

// load environment variables
dotenv.config();

dbconnect();

const server = express();
const  PORT = process.env.PORT || 5000;

server.use(
    cors({
        origin:"http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
          ],
        credentials:true
    }))

server.use(express.json())
server.use(cookieParser())
server.use("/api/auth",authRouter)
server.use("/api/admin/products",adminProductsRouter)
server.use("/api/admin/order",adminOrderRouter)

server.use("/api/shop/products",shopProductsRouter)
server.use("/api/shop/cart",shopCartRouter)
server.use("/api/shop/review",shopProductReviewRouter)
server.use("/api/shop/address", shopAddressRouter)
server.use("/api/shop/search", shopSearchRouter)
// server.use("/api/shop/order",shopOrderRouter)
server.listen(PORT,()=>console.log("server started"));
