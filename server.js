const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const engine = require('ejs-mate');

const port= 3002;

var app = express();

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

const homeRoutes = require("./routes/homepage.js");


app.use(homeRoutes);

app.listen(port,()=>{
    console.log('app running on port 3002')
});