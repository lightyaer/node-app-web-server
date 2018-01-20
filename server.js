const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now} : ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        console.log('Logged to server.log')
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainence.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    // return 'test';
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',

        welcomeMessage: 'Welcome to shity Website here'

    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',

    });
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs' , {
        pageTitle : 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});