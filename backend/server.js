const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const dbConnect = require("./config/db/dbConnect");

const app = express();
//DB
dbConnect();
//server
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));


// loluser - 3cfZCmuPiBh8pG3e