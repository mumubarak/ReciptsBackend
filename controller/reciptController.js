const reciptModel = require(`../model/recipt`);
const vendorModel = require(`../model/vendor`);
const categoryModel = require(`../model/category`);
exports.addRecipt = async function (req, res, next) {
  try {

    const vendorObject = vendorModel.findById(req.body.vendor)
      .lean().exec(async function (err, results) {

        if (err) {
          res.status(400).json({ message: "invalid vendor" });
        } else {
          try {
            const cat =await getCategory(req.body.category);
            

            //console.log("from add"+ await getCategory(req.body.category));
           console.log("from addcat"+ cat._id);
            const reciptObject = await reciptModel.insertMany({
              //need to add a validation for body inputs
              // serialNumber:req.body.serialNumber,
              vendor: results._id,
              category: cat._id,
              tax: req.body.tax,
              service: req.body.service,
              amount: req.body.amount,
              totalAmount: req.body.amount,
              status: "ACTIVE",
              userId: req.userId,
              items: req.body.items,
            });
            console.log(reciptObject);
            res.status(201).json({ reciptObject, message: "Recipt Successfully Inserted" });
          } catch (error) {
            console.log(error);

            res.status(500).json({ message: "catch error requesting an order reset" });
          }
        }

      });

  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Invalid Vendor" });
  }


};

exports.getReciptById = async function (req, res, next) {
  try {
    //const user =req.userId;
    const reciptId = req.query.id
    const reciptObject = reciptModel.findById(reciptId).populate({
      path: "vendor"
    }).populate({path: "category"})
      .lean().exec(function (err, results) {
        if (err)
          return console.error(err);
        try {
          console.log(results);
          res.status(200).json({ reciptObject, message: "Recipt Successfully retrived", results });

        } catch (error) {
          console.log("errror getting results");
          console.log(error);
        }
      });
  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};
exports.getAllRecipts = async function (req, res, next) {
  try {

    const reciptObject = reciptModel.find({ userId: req.userId }).populate({
      path: "vendor"
    }).populate({path: "category"})
      .lean().exec(function (err, results) {
        if (err) return console.error(err)
        try {
          console.log(results)
          res.status(200).json({ message: "Recipt Successfully retrived", results });
        } catch (error) {
          console.log("errror getting results")
          console.log(error)
        }
      });

  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};
exports.getCustomRecipts = async function (req, res, next) {
  try {
    console.log(req.userId);
    var criteriaObject = {};
    if (req.vendor !== '') {
      criteriaObject["vendor"] = req.body.vendor;
    }
    if (req.category !== '') {
      criteriaObject["category"] = req.body.category;
    }
    if (req.user !== '') {
      criteriaObject["userId"] = req.userId;
    }
    //const fromDate = req.fromDate;
    console.log(criteriaObject);

    const reciptObject = reciptModel.find(criteriaObject).populate({path: "vendor"}).populate({path: "category"})
      .lean().exec(function (err, results) {
        if (err) return console.error(err)
        try {
          console.log(results)
          res.status(200).json({ message: "Recipt Successfully retrived", results });

        } catch (error) {
          console.log("errror getting results")
          console.log(error)
        }
      });
  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};

exports.deleteRecipt = async function (req, res, next) {
  try {

    const reciptObject = await reciptModel.delete(req.id)
      .lean().exec(function (err, results) {
        if (err) return console.error(err)
        try {
          console.log(results)
        } catch (error) {
          console.log("errror getting results")
          console.log(error)
        }
      });
    res.status(200).json({ message: "Recipt Successfully retrived", reciptObject });
  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};
exports.getReciptByCategoryId = async function (req, res, next) {

  try {

    const currentCategory = req.query.category
    // console.log(currentCategory)
    let reciptObject = await reciptModel.findOne({ category: currentCategory }).select("_id")
    //console.log(reciptObject)

    if (reciptObject) {
      const recipt = reciptModel.findById({ reciptObject: reciptObject }).populate({
        path: 'vendor'
      }
      ).populate({path: "category"}).lean()
      console.log(recipt)
      res.status(200).json({ recipt, message: "Recipt Successfully retrived" });



    } else {
      res.status(200).json({ message: "category in recipt donot have id " });

    }
  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};

exports.getReciptByVendorId = async function (req, res, next) {
  try {
    //const user =req.userId;
    const vendor = req.query.vendorId
    const reciptObject = reciptModel.findById(vendor)

      .lean().exec(function (err, results) {
        if (err)
          return console.error(err);
        try {
          console.log(results);
          res.status(200).json({ reciptObject, message: "Recipt Successfully retrived", results });

        } catch (error) {
          console.log("errror getting results");
          console.log(error);
        }
      });
  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};


const getCategory = async function (categoryId) {
  

    const categoryObject = categoryModel.findById(categoryId);
      return categoryObject


};
