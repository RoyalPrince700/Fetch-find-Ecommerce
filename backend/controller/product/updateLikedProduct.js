const uploadProductPermission = require("../../helpers/permission");
const likedModel = require('../../models/likedProduct'); // Assuming you have this model created



async function updateLikedProduct(req, res) {
  try {
    // Check if the user has permission to update liked products
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }

    const { userId, productId, ...resBody } = req.body; // Assuming you pass userId and productId in the body for update

    // Find the liked product entry for the user
    const likedProduct = await likedModel.findOne({ userId: userId });

    if (!likedProduct) {
      return res.status(404).json({
        message: "Liked products not found for this user.",
        error: true,
        success: false,
      });
    }

    // Update the specific liked product details (assuming products is an array)
    const productIndex = likedProduct.products.findIndex((product) => product._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Product not found in liked products.",
        error: true,
        success: false,
      });
    }

    // Update the liked product
    likedProduct.products[productIndex] = { ...likedProduct.products[productIndex], ...resBody };

    await likedProduct.save();

    res.json({
      message: "Liked Product Updated Successfully",
      data: likedProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateLikedProduct;
