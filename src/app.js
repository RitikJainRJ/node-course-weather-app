const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setting Express
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serving the static files
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ritik Jain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ritik Jain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Ritik Jain",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({ error: "Please provide a location" });
  }

  geocode(req.query.location, (error, { longitude, latitude } = {}) => {
    if (error) {
      res.send(error);
    } else {
      forecast(longitude, latitude, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errorText: "Help article not found",
    title: "Error",
    name: "Ritik Jain",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    errorText: "Error 404 page not found",
    title: "Error",
    name: "Ritik Jain",
  });
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
