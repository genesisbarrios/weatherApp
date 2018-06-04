var express = require("express");
var app = express();
var request = require("request");
var path = require("path");
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/views')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req,res){
    res.render('weather');
});

app.post('/', function (req, res) {
    var apiKey = '709eab84b58e23ff368ee332b646a264';
    var city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

    request(url, function(error, response, body){
        if(!error){
            var data = JSON.parse(body);
            res.render('weather', {data: data});
        }
    });
});

app.listen(3000,"localhost", function(){
    console.log("Weather App has started!!!");
});