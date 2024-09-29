const express = require("express");
const sequelize = require("./database/database");
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const checkLoggedIn=require("./utils/check-loggedin");
app.use(express.json());
app.use(
  session({
    secret: "I love Cherry",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: { secure: false },
  }),
);

//routes
const authRoutes = require("./routes/auth");
const roomsRoutes = require("./routes/rooms");
const userRoutes = require("./routes/user");
app.use("/", authRoutes);

app.use(checkLoggedIn);//the routes below only work if the user is logged in
app.use("/rooms", roomsRoutes);
app.use("/user", userRoutes);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync(); // Use { alter: true } to update existing tables or { force: true } to recreate theme
  })
  .then(() => {
    console.log("Models synchronized successfully.");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
