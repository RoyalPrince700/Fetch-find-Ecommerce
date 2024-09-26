



const likedModel = require("../../models/likedProduct")

const likedProductView = async(req,res)=>{
    try{
        const currentUser = req.userId

        const likeProduct = await likedModel.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : likeProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = likedProductView