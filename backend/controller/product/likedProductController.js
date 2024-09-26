const likedModel = require('../../models/likedProduct'); // Assuming you have this model created

const likeProductController = async (req, res) => {
  try {
    // Get product ID from request body and user ID from auth token middleware
    const { productId } = req.body; 
    const currentUser = req.userId;  

    // Check if user is authenticated
    if (!currentUser) {
      return res.status(401).json({
        message: "Please login to like this product.",
        success: false,
        error: true
      });
    }

    // Check if the product is already liked by the user
    const existingLike = await likedModel.findOne({ productId, userId: currentUser });

    if (existingLike) {
      // If the product is already liked, remove the like (toggle feature)
      await likedModel.findByIdAndDelete(existingLike._id);
      return res.json({
        message: "Product unliked.",
        success: true,
        error: false
      });
    }

    // Create payload for liking the product
    const payload = {
      productId: productId,
      userId: currentUser,
    };

    // Add product to liked list and save to database
    const newLikedProduct = new likedModel(payload);
    const saveLikedProduct = await newLikedProduct.save();

    res.json({
      data: saveLikedProduct,
      message: "Product liked.",
      success: true,
      error: false
    });

  } catch (err) {
    console.error("Error in likeProductController:", err); // Log the error for debugging
     res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = likeProductController;





