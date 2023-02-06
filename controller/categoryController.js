const categorytModel = require(`../model/category`);
const path=require('path')
const fs = require("fs");
exports.addCategory = async (req, res) => {
  try {  
    const  categoryName = req.body.categoryName;
    const categoryImg = req.file.filename;
      
     const category =await categorytModel.create({
      categoryName,
      categoryImg
     })
           res.status(500).json({ category, message: " succes category added" });

      
  } catch (error) {
    res.status(500).json({ message: "error in category" });
  }
};