const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const engine = require('ejs-mate');
const secret = require('./config/secret.js');

const port= 3002;

var app = express();

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

const homeRoutes = require("./routes/homepage.js");
const displayRoutes = require("./routes/display.js");
const paymentsRoutes = require('./routes/charge.js');

app.use(homeRoutes);
app.use(displayRoutes);
app.use(paymentsRoutes);

app.listen(port,()=>{
    console.log(`app running on ${secret.port}`)
});