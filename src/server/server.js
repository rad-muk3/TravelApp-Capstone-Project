/**
 * Setup empty JS object to act as endpoint for all routes
 *
 */
projectData = {};

/**
 * @description Express, Body-Parser and CORS Setup
 * @descirption Require to run the server and use Body-parser and CORS
 *
 */

const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/**
 * Middleware
 * @description Configure express to use body-parser as middle-ware.
 *
 **/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/**
 * CORS
 * @description Configure CORS for express to use it
 *
 **/
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
// Weback outputs to dist folder
app.use(express.static('dist'));

/**
 * @description Setup server
 *
 */
const port = 3000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

/**
 *@description GET route so that the posted data
 *@description can be retrieved back to the frontend
 *
 **/

app.get('/all', sendData);

function sendData(request, response) {
  response.send(projectData);
}

/**
 * @description POST route
 *
 * @description Add trip-info received from client-side to the projectData object
 * @returns data received from client-side POST
 *
 **/
app.post('/tripinfo', async (req, res) => {
  const tripData = req.body;
  const finaltripData = {
    destination: tripData.destination,
    date: tripData.travelDate,
    daysLeft: tripData.remainingDays

  }
  projectData = finaltripData;

  res.send({
    status: 'OK'
  })
})

/**
 *@description Send a GET request to end point
 *@description using supertest get method
 **/
app.get('/testendpoint', (req, res) => {
  res.send('OK')
})

module.exports = app;
