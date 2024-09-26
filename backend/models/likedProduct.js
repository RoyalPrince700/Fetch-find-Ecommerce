const mongoose = require('mongoose')

const likedProduct = mongoose.Schema({
  productId : {
    ref : 'product',
    type : String,
  },
  userId : String,
},{
    timestamps : true
})

const likedModel = mongoose.model("likedProduct",likedProduct)

module.exports = likedModel


