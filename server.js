const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentDate', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('sever.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
            console.log('Error logging into file!!');
        }
    });
    next(); 
});

app.use((req, res, next) => {
    res.render('maintainence.hbs');
});

app.use(express.static(__dirname + '/public'));

//Register handler for http get request
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home',
        welcomeMsg: 'Welcome To The Flash World!!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'Error occured',
        msgCode: 'WS400'
    });
});

app.listen(port, () => {
    console.log(`App running on server port ${port}`);
});