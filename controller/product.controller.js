const { productModel } = require("../models");



const createProduct = async (req,res)=>{

    try{
        const body = req.body;
        body.mrp = "₹"+body.mrp;
        body.selling_price = "₹"+body.selling_price;
        const Product = new productModel(body);
        await Product.save();
        res.status(200).json({
            success:true,
        })
    }
    catch(err){
        res.status(404).json({
            error:"Something Went Wrong!"
        })
    }
    
}

const getProducts = async (req,res)=>{
    try{
        const data = await productModel.find();
        res.status(200).json({
            Products:data,
        })
    }catch(err){
        res.status(404).json({
            error:"Unable to Fetch Products"
        })
    }
}

const getProduct = async (req,res)=>{
    const id = req.params.id;
    try{
        const data = await productModel.findById(id);
        res.status(200).json({
            Product:data,
        })
    }catch(error){
        res.status(400).json({
            error:"Cannot Find Product"
        })
    }
}

const updateProduct = async (req,res)=>{
    const id  = req.params.id;
    const body  =req.body;
    try{
        const data = await productModel.findByIdAndUpdate(id,body);
        res.status(200).json({
            message:"Product Updated Successfully !",
            Product:data,
        })
    }catch(err){
        res.status(400).json({
            error:"Something Went Wrong!"
        })
    }
}

const deleteProduct  = async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await productModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"Product Deleted Succesfully!",
            deletedProduct:data,
        })
    }catch(err){
        res.status(400).json({
            message:"Cannot Delete Product!"
        })
    }
   
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};


