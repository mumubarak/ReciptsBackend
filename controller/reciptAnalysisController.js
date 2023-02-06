const reciptModel = require(`../model/reciptAnalysis`);

exports.getPieChart = async function (req, res, next) {
  try {
    const id = req.body.id;
    const resets = await reciptModel.find({ userId: req.userId });
    resets.map((item) => {
      item.resetDetails.map((reset) => {
        if (id == reset._id) {
          res.status(201).json({ message: "reset ready details", reset });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "catch error requesting an order reset" });
  }
};

exports.getUserObject = async function (req, res, next) {
  try {
      const userId = req.body.userId

      const _userDB = await User.findById(userId)

      if (!_userDB) {
          const message = getStatusAndErrorMessage("all_error_msg_user_is_not_exist", req.query.language)
          return res.status(401).send({
              status: "USER_NOT_EXISTS",
              ...message
          })
      }

      let result = {
          id: _userDB._id,
          email: _userDB.email,
          mobile: _userDB.mobile,
          firstName: _userDB.firstName,
          lastName: _userDB.lastName,
          isVerified: _userDB.isEmailVerified || _userDB.isMobileVerified
      }

      return res.status(200).json({
          status: "OK",
          result: result
      });

  } catch (err) {
      console.log("authenticationV1.4.js====>getUserObject", err);
      let message = getStatusAndErrorMessage('all_error_mg_general', req.query.language);
      res.status(500).json({
          status: "SERVER_ERROR",
          ...message
      });
  }
}
