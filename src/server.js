import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './server/App';
import Html from './server/Html';
import HtmlError from './server/HtmlError';
import r2 from 'r2';
import fs from 'fs';

const port = 3000;
const server = express();

const getWeatherApi = async (city) => {
  const url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=' + encodeURIComponent(city) +',dk&appid=166d00e26d3ff2c6149e89feccc5c59a';
  return await r2(url).json;
}

server.get('/script/*', (req, res) => {
  const requestedScript = req.url.substring('/script/'.length);
  const unallowedScripts = ['server.js']
  if (unallowedScripts.indexOf(requestedScript) === -1) {
    res.type('.js');
    fs.readFile('./dist/' + requestedScript,
      {encoding: 'utf-8'},
      (err, data) => {
        if (!err)
        {
          res.send(data);
        } else {
          res.send('throw javascriptLoadError;');
        }
      }
    );
  }
});

server.get('/api', (req, res) => {
  const city = (req.query.city) ? req.query.city : 'Copenhagen';
  const weatherData = getWeatherApi(city);
  weatherData.then((resp) => {
    res.type('json');
    res.send(resp);
  });
});

server.get('/', (req, res) => {
  const city = (req.query.city) ? req.query.city : 'Copenhagen';
  const weatherData = getWeatherApi(city);
  weatherData.then((resp) => {
    const body = renderToString(<App weatherData={resp} />);
    const title = 'Meteorology: ' + city;
    const data = JSON.stringify(resp, null, '');
    res.send(
      Html(
        {body,
        title,
        data}
      )
    );
  }, (error) => {
    const title = 'Meteorology: ' + city + ' Error';
    res.send(
      HtmlError(
        title
      ));
  });
  
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
