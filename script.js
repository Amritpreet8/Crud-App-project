require('./models/mongodb');
 
//Import the necessary packages
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
 
const courseController = require('./controllers/courseController');
 app.use('/static',express.static("public"))
app.use(bodyparser.urlencoded({
extended: true
}));
 
//Create a welcome message and direct them to the main page
app.get('/', (req, res) => {
res.send(`
 
<h2 style="font-family: Malgun Gothic; color: midnightblue ">Welcome to AMRIT Courses</h2>
 
 
 Click Here to go to <b> <a href="/course">Course Page</a> </b>`);
});
app.use(bodyparser.json());
 
//Configuring Express middleware for the handlebars
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');
 
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Listening on port ${port}..`));
 
//Set the Controller path which will be responding the user actions
app.use('/course', courseController);