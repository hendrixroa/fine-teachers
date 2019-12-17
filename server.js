const parser = require("body-parser");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
})

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));        
app.use(parser.text());                            
app.use(parser.json({ type: 'application/json'}));
  
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server initialized on port: ${port}`);
})