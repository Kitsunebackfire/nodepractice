const express = require("express");
const app = express();
const port = 8080;
// example of a middleware function
const myLogger = function (req, res, next) {
  console.log("Request IP: " + req.ip);
  console.log("Request Method: " + req.method);
  console.log("Request date: " + new Date());
  // putting next here tells express to move on through the stack rather than just stopping
  next(); // THIS IS IMPORTANT!
};

app.use(myLogger);

app.get("/", function (req, res) {
  res.sendFile("pages/index.html", { root: __dirname });
});

app.get("/about", function (req, res) {
  res.sendFile("pages/about.html", { root: __dirname });
});
app.get("/contact-me", function (req, res) {
  res.sendFile("pages/contact-me.html", { root: __dirname });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

// we put the error page at the end of the stack. if it reaches here, the url is invalid.
// no next() is required because we want it to stop here at the end of the stack anyways
app.use((req, res) => {
  res.status(404).sendFile("pages/404.html", { root: __dirname });
});
