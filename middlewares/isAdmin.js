exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(401)
        .json({ message: "you are not admin", status: "fail" });
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "something wrong" });
  }
};
