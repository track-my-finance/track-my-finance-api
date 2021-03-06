const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send({ status: 400, message: "Access Denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
    res.locals.user = verified;
    next();
  } catch (err) {
    res.status(401).send({ status: 401, message: `Invalid Token: ${err}` });
  }
};
