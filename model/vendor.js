const mongoose = require(`mongoose`);

const vendorSchema = mongoose.Schema(
  {
    vendorName: { type: String ,require:true},
    vendorImg: { type: String, require:true}

  }
);

const vendorModel = mongoose.model("vendor", vendorSchema);

module.exports = vendorModel;
