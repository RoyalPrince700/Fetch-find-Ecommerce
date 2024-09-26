const likedModel = require('../../models/likedProduct');

const fetchLikedProductsController = async (req, res) => {
  try {
    const currentUser = req.userId;  // Get user ID from auth token middleware

    // If user is not authenticated, send login prompt
    if (!currentUser) {
      return res.status(401).json({
        message: "Please login to view liked products.",
        success: false,
        error: true
      });
    }

    // Fetch liked products for the current user
    const likedProducts = await likedModel.find({ userId: currentUser }).populate('productId');

    res.json({
      data: likedProducts,
      success: true,
      error: false
    });
  } catch (err) {
    // Catch any errors and return a response
    console.error("Error fetching liked products:", err);
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false
    });
  }
};

module.exports = fetchLikedProductsController;
