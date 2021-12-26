const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("postman-request");
const { response } = require("express");
const viewsPath = path.join(__dirname, "../templates", "views");
const partialsPath = path.join(__dirname, "../templates", "partials");
const publicPath = path.join(__dirname, "../public");
const app = express();
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.get("", (req, res) => {
  res.render("index",{
    title:"Get Weather",
  });
});
app.get("/api/weather/*", (req, res) => {
  const cityName = req.query.cityName;
  const uri = `http://api.weatherstack.com/current?access_key=c39960075c97a1a337d5cbda4c0e43ec&query=${cityName}`;
  request(uri, (err, response, body) => {
    if (response.statusCode == 200) {
      res.json(JSON.parse(body));
    } else {
      res.err(404);
    }
  });
});
app.get("/home",(req,res)=>{
  res.render("index",{
    title:"Get Weather",
  });
})
app.get("/about",(req,res)=>{
  res.render("about",{
    title:"About this site",
    heading:"About",
    body:"This is a test app to get current weather. Made with Node.js, Express"
  });
})
app.get("/code",(req,res)=>{
  res.redirect("https://github.com/ajaybshinde21/projects-from-andrew-mead-node-course/tree/main/weather-app");
})

app.get("*",(req,res)=>{
  res.render("404",{title:"404=Page Not Found",
  body:"We're Sorry the requested page couldn't be found."});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
  console.log(`Server started at port :${PORT}`);
});
