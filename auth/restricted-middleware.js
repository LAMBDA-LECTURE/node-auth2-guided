const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../api/configs");


module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization

  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        //token is invalid
        res.status(401).json({ message: "invalid token" })
      } else {
        //token is valid, put on the req
        req.jwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ message: "ya forgot the creds"})
  }
};
