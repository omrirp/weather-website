/** @format */

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const pointstack = require('./utils/pointstack');
const forecast = require('./utils/forecast');

const app = express();

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

//Setup a static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Omri',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Omri',
  });
});

app.get('/help', (req, res) => [
  res.render('help', {
    title: 'Help Page',
    name: 'Omri',
    message: 'this is Help Page',
  }),
]);

app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: 'Adress must by provided',
    });
  }

  pointstack(req.query.adress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    //res.send(data);
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        adress: req.query.adress,
      });
    });
  });

  //res.send({ adress: req.query.adress });
});

app.get('/help*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Omri',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Omri',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
