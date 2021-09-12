"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const axios = require("axios");
const accounts = require("./accounts.js");
const stationStore = require("../models/station-store");
const station = require("../controllers/station");



const dashboard = { // The dashboard is ensuring that the current user is the one who signed in, also bring information from station store, bringing in all the stations showing under this account.
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Weathertop Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id)
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) { // This ensures you are able to delete your station.
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) { // This ensures you are able to add a station.
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
    response.redirect("/dashboard");
  },
  
};

module.exports = dashboard;
