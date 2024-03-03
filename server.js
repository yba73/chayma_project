const express = require("express");
require("dotenv").config();

require("./Config/connect");
const cors = require("cors");
const {
  authenticateToken,
  checkPermissions,
} = require("./middlewares/auth.middlewarese");

// Create an Express app
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers
app.use(cors());

//users routes
app.use("/api/v1/users", require("./routes/users.routes"));
//auth routes
app.use("/api/v1/auth", require("./routes/auth.routes"));

//admin routes
app.use("/api/v1/admin", require("./routes/admin.routes"));
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);
});
