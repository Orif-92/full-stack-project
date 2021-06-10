const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const expressHbs = require("express-handlebars");
const app = express();

app.use("/static", express.static(__dirname + "public"));

app.engine(".hbs", expressHbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL connected...");
  }
});
app.use("/", require("./routes/page"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => {
  console.log("Server has been started on 3000...");
});
