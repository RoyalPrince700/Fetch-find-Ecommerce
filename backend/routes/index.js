//anything you add here, go to frontend common folder and add it there

const express = require('express')

const router = express.Router()



const authToken = require('../middleware/authToken')


const UserSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')

const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhooks')
const orderController = require('../controller/order/orderController')
const likeProductController = require('../controller/product/likedProductController')
const updateLikedProduct = require('../controller/product/updateLikedProduct')
const fetchLikedProductsController = require('../controller/product/fetchLikedProduct')
const countLikedProduct = require('../controller/product/countLikedProduct')
const likedProductView = require('../controller/product/likedProductView')



router.post("/signup",UserSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

//admin panel 

router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken, updateUser) //goto the front end folder also go to the changeuserrole in componenet

//upload product
router.post("/upload-product",authToken, uploadProductController)
router.get("/get-product", getProductController) // no need for auth cos the info will be used anywhere
router.post("/update-product", authToken, updateProductController) // auth cos only log in user can update this
router.get("/get-categoryProduct",getCategoryProduct) //no need for authentication
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details",getProductDetails)

//user add to cart 

router.post("/addtocart",authToken, addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/viewCartProduct",authToken, addToCartViewProduct)
router.post("/update-cart-product",authToken, updateAddToCartProduct)
router.post("/delete-cart-product",authToken, deleteAddToCartProduct)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)
router.post("/like-product",authToken, likeProductController);

//payment and order
router.post("/checkout",authToken, paymentController)
router.post("/webhook",webhooks) //api/webhook
router.get("/order-list",authToken, orderController)
router.post("update-liked-product", authToken, updateLikedProduct)
router.post("fetch-liked", authToken, fetchLikedProductsController)
router.get("/countLikedProduct",authToken, countLikedProduct)
router.get("/view-liked-product",authToken, likedProductView)


module.exports = router
