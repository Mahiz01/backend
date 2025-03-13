const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const mongo_connect = require("./dbConnect");
const { json } = require("body-parser");
const routerEmployee = require("./routes/employeeRoute");
const routerProject = require("./routes/projectRoute");
const routerRoute = require("./routes/taskRoute");
const routerAssign = require("./routes/assignRoute");
const routerHr = require("./routes/hrRoute");
const routerAuth = require("./routes/authRoute");
dotenv.config();
const cors = require("cors");
const routerComment = require("./routes/commentRoute");
const PORT = process.env.PORT;
// const port =3000

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/employee",routerEmployee);
app.use("/api/project",routerProject);
app.use("/api/task",routerRoute);
app.use("/api/assign",routerAssign)
app.use("/api/hr",routerHr);
app.use("/api/comment",routerComment)

app.use("/api/auth",routerAuth)
app.listen(PORT,()=>{
    console.log("Listening to the port",PORT);
})

mongo_connect();