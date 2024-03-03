const mongoose = require("mongoose");

exports.vlidateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).json({ message: "invalid id" });
  next();
};
