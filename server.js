var express = require('express');
var bodyParser = require ('body-parser');
var path = require('path');



var app = express();
PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


require('./app/routing/htmlRouts')(app,path);
require('./app/routing/apiRouts')(app,path);

app.listen(PORT, function(){

    console.log("Listening to Port: "+PORT);
});