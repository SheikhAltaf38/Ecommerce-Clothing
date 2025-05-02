const Product = require("../../models/Product")
const searchProducts = async(req,res)=>{
    const {search} = req.params;
    try {
        if(!search || typeof search !== "string"){
            return res.status(400).json({
                success:false,
                message:"search text is not found"
            })
        }
        const regex = new RegExp(search,"i");
        const createSearchQuery = {
            $or:[{
                title:regex},
                {description:regex},
                {category:regex},
                {brand:regex
            }]
        }
        const searchResults = await Product.find(createSearchQuery);

        return res.status(200).json({
            success:true,
           data: searchResults
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
module.exports= {searchProducts};