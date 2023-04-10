const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
var cors = require('cors')

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json' , true);
    next();
});
app.use("/api", router);


module.exports = app;
