const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const date = require(__dirname+"/"+"date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

var items = [];
var workItems = [];

app.get("/", function (req, res) {
let day = date();

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.get("/about",function(req,res){
  res.render("about");
})
app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});
