const express = require("express");
const sequelize = require("./database/database");
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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
const roomRoutes = require("./routes/room");
const userRoutes = require("./routes/user");
app.use("/", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/users", userRoutes);
app.get("/", function (req, res) {
  res.send("Hello!");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ force: true }); // Use { alter: true } to update existing tables or { force: true } to recreate them
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
