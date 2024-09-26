const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body; // Get product ID from request body
    const currentUser = req?.userId;  // Get user ID from authToken middleware

    // If user is not authenticated, send login prompt
    if (!currentUser) {
      return res.status(401).json({
        message: "Please Login to add items to your cart.",
        success: false,
        error: true
      });
    }

    // Check if the product is already in the user's cart
    const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

    if (isProductAvailable) { // If product already in cart, show error
      return res.json({
        message: "Already Added to Cart",
        success: false,
        error: true
      });
    }

    // Create payload for new cart entry
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    // Add product to cart and save to database
    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      data: saveProduct,
      message: "Product Added",
      success: true,
      error: false
    });

  } catch (err) {
    // Catch any errors and return a response
    res.status(500).json({
      message: err?.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = addToCartController;

