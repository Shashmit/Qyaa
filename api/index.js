const express = require("express");
require("dotenv").config();
var cors = require("cors");
const app = express();
const { connectMongoDB } = require("./middlewares/mongooseInit");
const port = process.env.PORT || 8000;
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);

// Package Import and variable initializations
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const store = new MongoDBstore({
  uri: process.env.SESSION_URI,
  collections: process.env.SESSION_COLLECTION,
});
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);
// app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
    store: store,
  })
);
// Middleware Initializations

//Start Of Routes

app.get("/", (req, res) => { res.send("Server Working!!"); });
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

//End Of Routes

//Database Connection and Server Initialization

connectMongoDB(process.env.MONGO_URI || "")
  .then((result) => {
    const server = app.listen(port, () => {
      console.log("Server is successfully running on port " + port + " !!");
    });
  })
  .catch(console.log);
