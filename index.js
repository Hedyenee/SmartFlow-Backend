const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

require("dotenv").config();
const PORT = process.env.PORT || 5000;

//dbConnection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
    // Server listen
    server.listen(PORT, () => console.log(`Server Connected on port ${PORT}`));
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });
 