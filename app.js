const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log("Post received");
  console.log(req.body.cityName);
  const query = req.body.cityName;
  url =
    "https://api.openweathermap.org/data/2.5/weather?appid=Enter Your ID&q=" +
    query +
    "&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon = weatherData.weather[0].icon;
      console.log(icon);
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1> Weather Conditions </h1>");
      res.write("<p>It is " + temp + " degrees </p>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
