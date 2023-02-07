const vendorModel = require(`../model/vendor`);

exports.addVendor = async (req, res) => {
  try {
    
    let vendorName= req.body.vendorName
    var vendorImg = '/opt/ReciptsBackend/images/img_vendor/'+ req.file.filename
    console.log(vendorImg,vendorName)

    const vendor = await vendorModel.create({
      vendorName,
      vendorImg
      })
      res.status(200).json({ vendor, message: " succes vendor added" });

          } catch (error) {
            console.error(error);

    res.status(500).json({ message: "error in adding vendor" });
  }
};

exports.getAllVendors = async function (req, res, next) {
  try {

    const vendorObject =  vendorModel.find({})     
    .lean().exec(function (err, results) {
    if (err) return console.error(err)
    try {
        console.log(results)
        res.status(200).json({ message: "Vendor Successfully retrived" ,results});            
    } catch (error) {
        console.log("errror getting results")
        console.log(error)
    } 
})
} catch (error) {
  res.status(500).json({ message: "catch error requesting an order reset" });
}
};