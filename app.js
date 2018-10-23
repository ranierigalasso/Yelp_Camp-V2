var express    = require ("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require ("mongoose")

app.use (bodyParser.urlencoded({extended: true}));
app.set ("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Mongo
var campgroundSchema = new mongoose.Schema ({
  name: String,
  image: String
})

//Compile Schema into model
 var Campground = mongoose.model ("Campground", campgroundSchema);

//Create campground in database
//Campground.create(
//  {
//  name: "Mountain Goat's Rest",
//  image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_1280.jpg"
//  }, function (err, campground) {
//  if (err) {
//      console.log(err);
//  } else {
//      console.log("newly created campground");
//      console.log(campground);}
//});

//Landing page route
app.get ("/", function (req, res) {
  res.render("landing");
});

//Campgorunds routes
app.get ("/campgrounds", function (req, res) {
  //Get all campgrounds from DB
  Campground.find ({}, function (err, allCampgrounds){
    if (err) {
      console.log (err)
    } else {
      res.render ("campgrounds", {campgrounds:allCampgrounds});
    }
  });
});

app.post ("/campgrounds", function (req, res) {
  //Get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  //Redirect to campgrounds page
  res.redirect("/campgrounds");
});

app.get ("/campgrounds/new", function (req, res) {
  res.render ("new.ejs");
});

//Server listen
app.listen(3000, function () {
  console.log("Server Started");
})
