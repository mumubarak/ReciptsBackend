const jwt = require(`jsonwebtoken`);

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        res.json({ message: `invalid token` });
      } else {
        req.userId = decoded.user_id;
        
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ messageError: "catch error in authentication" });
  }
};
