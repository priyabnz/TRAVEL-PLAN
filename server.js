const express = require("express");
const path = require("path");
const { cities } = require("./db");
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + "/dist"));

// send the user to index html page inspite of the url
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/dist", "index.html"));
});

app.get("/api/cities", (req, res) => {
  let query = cities.filter((i) => req.query.value.includes(i.value));
  res.status(200).json(query)
});

app.get("/api/cities/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  if (name === "fail") {
    let error = new Error(`Error fetching city!`)
    error.statusCode = 400
    throw error;
  }
  const matches = cities.filter((i) =>
    i.label.toLowerCase().includes(name)
  );
  res.status(200).json(matches)
});

app.listen(port);
