const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
let items = [];
let i = -1;
let workItems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {

  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work",
    newListItems: workItems
  });
});

app.get("/about", function(req, res){
  res.render("about")
});

app.post("/",function(req, res){
  let item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }


  i++;

});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.post("/allClear",function(req, res){
  items = [];
  i = -1;
  res.redirect("/");
});
app.post("/clear", function(req,res){
  items[i] = "Removed";
  i--;
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("The server is up and running at port 3000");
});
