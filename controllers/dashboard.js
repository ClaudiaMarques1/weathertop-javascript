"use strict";

const logger = require("../utils/logger");
const uuid = require('uuid');
const axios = require("axios");
const accounts = require("./accounts.js");
const stationStore  = require("../models/station-store");
//const stationAnalytics  = require("../utils/station-analytics");
const station  = require("../controllers/station");
  
const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    //const latestReading = stationAnalytics.getLatestReading(station.readings);
    const viewData = {
      title: 'Weathertop Dashboard',
      stations: stationStore.getUserStations(loggedInUser.id),
      /*stationSummary : {
        latestCode: latestReadingDash.code,
        //latestWeatherIcon: stationAnalytics.weatherIcon(latestReadingDash.code),
        latestTempC: latestReadingDash.temperature,
        latestTempF: stationAnalytics.celsiusToFahrenheit(latestReadingDash.temperature),
        latestWindChill: stationAnalytics.calculateWindChill(latestReadingDash.temperature, latestReadingDash.windSpeed),
        //latestWindSpeedBeaufort: stationAnalytics.beafourt(latestReadingDash.windSpeed),
        //latestWindCompass: stationAnalytics.degreesToCompass(latestReadingDash.windDirection),
        latestPressure: latestReadingDash.pressure
      }*/
    };
    logger.info('about to render', stationStore.getAllStations());
    response.render("dashboard", viewData);
  },
  
    deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },
  
    addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: []
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
  
  };

module.exports = dashboard;
