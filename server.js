//----------------dotenv------------------>
require('dotenv').config();

//<---------------const module--------------------->
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors')
// app.use(cors());

app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:4200'],
    credentials: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:8080");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

//<---------------const api route------------------->
const mongoose = require('./config/database'); //database configuration
const userRoute = require('./routes/user.route');
const comicRoute = require('./routes/comic.route');
// const chapterRoute = require('./routes/chapter.route');

//<---------------const view route------------------>
const viewComicRoute = require('./app/views/routes/comic.view.route');
const viewUserRoute = require('./app/views/routes/user.view.route');
//<---------------connect to database------------------->
mongoose.set('useFindAndModify', false); //modify user when update and delete
mongoose.connection.on('error', console.error.bind(console, "Mongo connection fail"));

//<-------------------pug html--------------------------->
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        comic: 'Comics'
    });
});

//<----------------middleware json--------------------->
app.use(express.json());

//<---------------api route----------------->
app.use('/api/users', userRoute);
app.use('/api/comics', comicRoute);

// app.use('/api/comics/:id', chapterRoute);
//<---------------view route--------------->
app.use('/comics', viewComicRoute);
app.use('/users', viewUserRoute);

// If any page not handled already handled (ie. doesn't exists)
app.get("*", function(req, res) {
  res.status(404).send("Error 404 - Page not found");
});

//<---------------start server-------------------------->
app.listen(port, () => { console.log("Server running in port " + port) });