var express = require("express");
const path = require("path");

const app = express();
const port = 8080 || process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Importing all the routes/api
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");

app.use("/api/auth", auth);
app.use("/api/questions", question);
app.use("/api/profile", profile);

//Basic Checking of Server
app.get("/", (req, res) => {
  res.render("test");
});

//Starting Server
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
