// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var tableData = require("./data/tableData");
var waiting = require("./data/waitinglistData");
//console.log(tableData)

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(tableData);
});

app.get("/api/waitlist", function(req,res){
    return res.json(waiting);
})

app.post("/api/reserve", function (req, res) {
    var newReserve = req.body;
    var random = Math.ceil(Math.random()*1000);
    newReserve.uniqueID = random;

    console.log(newReserve);
    
    if(tableData.length === 5) {// if reserve table length already at 5
        waiting.push(newReserve);//add to waiting array
    } else {
        tableData.push(newReserve);//else add to reserve array
    }
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});