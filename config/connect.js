const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("database connection established ");
  })
  .catch((error) => {
    console.log(error);
  });
