import moment from 'moment';


const img = document.querySelector('#pix-image');
const errorMessage = "Error: Please select a date within next 15 days only!";

/**
 *
 *Helper functions
 *
 */

/**
 * async Get and Post functions
 * GeoNames API async method uses GET request through fetch
 *
 **/

const getLocationfromGeoNames = async term => {
  const request = await fetch(`http://api.geonames.org/searchJSON?q=${term}&maxRows=1&username=${USERNAME}`);
  try {
    const geoLocData = await request.json();
    const {
      lat,
      lng
    } = geoLocData.geonames['0'];
    return {
      lat,
      lng
    };
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * async Get and Post functions
 * WeatherBit API async method uses GET request through fetch
 *
 **/
const getWeatherDetails = async (lat, lon) => {
  const request = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${WEATHERBITKEY}`);
  try {
    const weatherbitData = await request.json();
    return weatherbitData;
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * async Get and Post functions
 * PixaBay API async method uses GET request through fetch
 *
 **/
const getPixabayImage = async (pic) => {
  console.log('requesting for pictures from pixabay')
  const request = await fetch(`https://pixabay.com/api/?q=${pic}&image_type=photo&key=${PIXAIMAGEKEY}`);
  try {
    const pixabayData = await request.json();
    const dImgURL = pixabayData.hits['0'].webformatURL;
    img.src = dImgURL;
    return dImgURL;
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * POST response of weather data fetched to the server
 *
 **/
const postData = async (weatherData) => {
  const resp = await fetch('http://localhost:3000/tripinfo', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(weatherData)
  })
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }

}

/**
 * set the default date to current date
 *
 *
 **/

var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;


/**
 *
 * @description Find how many days are left to travel using the start date
 * @returns the days left from current date to travelDate
 **/

const daysLefttoTravel = async (tData) => {
  const curDay = moment().dayOfYear();
  const travelDate = moment(tData.travelDate).dayOfYear();
  return travelDate - curDay;
}

// Store the trip destination and travel date details in this object
let tripInputData = {}

/**
 * Event Generator for submit button click
 *
 **/
document.getElementById('submitBtn').addEventListener('click', performAction);

/**
 * main function
 * @description async function of action performed when submit button clicked
 *
 */
async function performAction(e) {
  e.preventDefault();
  const destination = document.querySelector('#destination');
  const travelDate = document.querySelector('#travelDate');

  tripInputData = {
    destination: destination.value,
    travelDate: travelDate.value
  }

  /**
   * description find how many days left to travel
   * Suing forecast api for 16 day/daily forecast
   **/
  const daysRemaining = await daysLefttoTravel(tripInputData);
  if (daysRemaining > 15 || daysRemaining < 0) {
    document.getElementById('errorMsg').innerHTML = errorMessage;
    return;
  } else tripInputData['remainingDays'] = daysRemaining;
  document.getElementById('countDays').innerHTML = `<h3> is in <span>${daysRemaining}</span> days </h3>`;


  // post trip data to express server
  const response = await postData(tripInputData)

  // getting the location information from the geonames API
  // getting the image from Pixabay API
  // getting the weather details from the weatherbit API
  // Use Promise All to resolve the api objects
  const geoLocation = getLocationfromGeoNames(tripInputData.destination);
  const pixImg = getPixabayImage(tripInputData.destination);

  //The Promise.all() method takesan array of objects in this case geoLocation
  // and pixaBay Image and wait till all the promises get resolved.
  const [coord, pixImgURL] = await Promise.all([geoLocation, pixImg])
  const wData = await getWeatherDetails(coord.lat, coord.lng);

  // This function updates UI with trip information along with weather details.
  updateUI(wData, tripInputData);

  destination.value = "";

}


//Update with result entries with destination, daysleft for travelDate
// and weather details for the travel date,
const updateUI = async (weatherbitInfo, tripInputData) => {

  // Select result entry holder items and update them
  const destinationName = document.querySelector("#destinationName");
  const tripDetails = document.querySelector("#tripDetails");

  // Update the name of the destination
  destinationName.innerText = tripInputData.destination;

  //Remove or delete the trip details
  tripDetails.classList.remove("hidden")

  // Obtain the weatherbit Data for the trip days

  const daysLeft = tripInputData.remainingDays;

  const {
    app_max_temp,
    app_min_temp,
    weather
  } = weatherbitInfo.data[daysLeft];
  const weatherUpdate = `
    <h4>HIGH: <span>${app_max_temp}</span>
    </h4>
    <h4>LOW: <span>${app_min_temp}</span>
    </h4>
	<h4><span>${weather.description}</span>
    </h4>
  `

  // Update the selected element with the weatherbit info for the destination:
  document.querySelector("#weatherForecast").innerHTML = weatherUpdate;
}

/**
 * description Add todo notes for travel
 * description add click event to create a container to user-input and Add button
 * Click event  button or key press to create a UL and List Items
 **/

// implementing the functionality to add todo elements
document.querySelector('#todo-notes-button').addEventListener('click', () => {
  Client.createToDoContainer();
  document.querySelector('#todoBtn').addEventListener('click', Client.addlistItems)
  document.querySelector('#myInput').addEventListener('keypress', e => {
    if (e.key === "Enter") {
      addlistItems();
    }
  })
});
