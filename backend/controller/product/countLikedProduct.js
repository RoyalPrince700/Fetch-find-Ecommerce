// const addToCartModel = require("../../models/cartProduct")

const likedModel = require("../../models/likedProduct")

const countLikedProduct = async (req,res)=>{
    try{
        const userId = req.userId

        const count = await likedModel.countDocuments({
            userId : userId
        })

        res.json({

            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err.message || error,
            error : false,
            sucess : false
        })
        
    }
}

module.exports = countLikedProduct