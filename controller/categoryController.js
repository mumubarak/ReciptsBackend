const categoryModel = require(`../model/category`);
const path=require('path')
const fs = require("fs");
exports.addCategory = async (req, res) => {
  try {  
    const  categoryName = req.body.categoryName;
    const categoryImg = '/opt/ReciptsBackend/images/img_category/'+ req.file.filename;
      
     const category =await categoryModel.create({
      categoryName,
      categoryImg
     })
           res.status(200).json({ category, message: " succes category added" });

      
  } catch (error) {
    res.status(500).json({ message: "error in category" });
  }
};


exports.getAllCategories = async function (req, res, next) {
  try {

    const categoryObject =  categoryModel.find({})     
    .lean().exec(function (err, results) {
    if (err) return console.error(err)
    try {
        console.log(results)
        res.status(200).json({ message: "category Successfully retrived" ,results});            
    } catch (error) {
        console.log("errror getting results")
        console.log(error)
    } 
})
} catch (error) {
  res.status(500).json({ message: "catch error requesting an order reset" });
}
};