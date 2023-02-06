const mongoose = require(`mongoose`);

const categorySchema = mongoose.Schema(
  {
    categoryName: { type: String,require:true },
    categoryImg: { type:String, require:true},
    //recipt: [{type: mongoose.Schema.Types.ObjectId,ref: 'recipt',require:true}]
    recipts: [{reciptId:{type: mongoose.Schema.Types.ObjectId,ref: 'recipt',require:true}}],
  
  });

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;