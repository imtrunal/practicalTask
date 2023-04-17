const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
require('./db/conn');
const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const authRouter = require("./router/auth.router")
const departmentRouter = require("./router/deparment.router")
const assignRouter = require("./router/assign.router")

app.use("/auth", authRouter)
app.use("/department", departmentRouter)
app.use("/assign", assignRouter)

app.listen(port, () => {
    console.log("=========================================================================");
    console.log(`SETUP :- Server running at : ${port}`);
})