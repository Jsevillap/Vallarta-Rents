const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const Rental = require("./models/rentals");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); //parse form data
app.use(express.json());
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);

//Connect mongoose to mongo database
mongoose.connect("mongodb://localhost:27017/vallarta-Rentals", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    //handle error    
    .then(() => {
        console.log("Mongo connection made")
    })
    .catch(err => {
        console.log("There is an error on mongo")
        console.log(err)
    });


app.listen(3000, () => {
    console.log("Server Started on port 3000")
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/newHouse", async (req, res) => {
    const house = new Rental({
        name: "Casa LV",
        location: "Chacala, Nayarit",
        price: 5000,
        description: "House located in Chacala Great for family and friends"
    })
    await house.save()
    res.send(house);
})