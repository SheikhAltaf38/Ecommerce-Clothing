const { query } = require("express");
const Product = require("../../models/Product")
const fetchAllFilteredProducts= async(req,res)=>{
    try {
    const {category=[],brand=[],sortBy="price-lowtohigh"}= req.query;
    // for multiple queries split it
    // console.log("query result ",req.query)
    let filters={}
    if(category.length){
    filters.category={$in:category.split(",")}
    }
    if(brand.length){
    filters.brand={$in:brand.split(",")}
    }
    // console.log(category ,"category")
    // console.log(sortBy ,"sortBY")
    // console.log(filters,"filters")
    // for single query
    let sort={}
    switch(sortBy){
        case "price-lowtohigh":
            sort.price=1
            break;
        case "price-hightolow":
            sort.price=-1
            break;
        case "title-atoz":
            sort.title=1
            break;
        case "title-ztoa":
            sort.title=-1
            break;
        default:
            sort.price=1;
            break;
    }
    
        const products= await Product.find(filters).sort(sort);
        // console.log(products)
        //  console.log(sort)
         return res.status(200).json({
            success:true,
            data:products
         })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"filter product does not fetch"
        })
    }
};
const fetchProductDetails=async(req,res)=>{
    try {
        const {id} = req.params;
        const productDetail= await Product.findById(id);
        // console.log(productDetail)
        if(!productDetail){
            return res.status(400).json({
                success:false,
                message:"filter product does not fetch"
            })
        } 
        return res.status(200).json({
            success:false,
            data:productDetail
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"filter product does not fetch"
        })
    }
}
module.exports ={fetchAllFilteredProducts, fetchProductDetails}