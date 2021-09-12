"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store.js");
const stationAnalytics = require("../utils/station-analytics.js");
const maxmin = require("../utils/max-min.js");
const axios = require("axios");

const station = { // This ensures you are able to bring all the calculations made in Max Min and Analytics to station.
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = " + stationId);
    const station = stationStore.getStation(stationId);
    const latestReading = stationAnalytics.getLatestReading(station.readings);
    if (station.readings.length > 0) { // These are the Max and Mins of the readings.
      station.minTemp = maxmin.getMinTemp(station)
      station.maxTemp = maxmin.getMaxTemp(station)
      station.minPressure = maxmin.getMinPressure(station)
      station.maxPressure = maxmin.getMaxPressure(station)
      station.minWindSpeed = maxmin.getMinWindSpeed(station)
      station.maxWindSpeed = maxmin.getMaxWindSpeed(station)
      }
    const viewData = {
      title: station.title + " Weather Station",
      station: stationStore.getStation(stationId),
      station: station,
      stationSummary: { // stationAnalytics calculations on the cards in station.
        latestCode: latestReading.code,
        latestWeatherCodes: stationAnalytics.weatherCodes(latestReading.code),
        latestWeatherIcons: stationAnalytics.weatherIcons(latestReading.code),
        latestTempC: latestReading.temperature,
        latestTempF: stationAnalytics.celsiusToFahrenheit(latestReading.temperature),
        latestWindChill: Math.round(stationAnalytics.calculateWindChill(latestReading.temperature,latestReading.windSpeed)),
        latestWindSpeedBeaufort: stationAnalytics.beafourt(latestReading.windSpeed),
        latestWindCompass: stationAnalytics.degreesToCompass(latestReading.windDirection),
        latestPressure: latestReading.pressure,
        latestWindCompass: stationAnalytics.degreesToCompass(
          latestReading.windDirection
        )
      }
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) { // Ability to remove readings from stations.
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) { // Ability to add reading to stations.
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      date: request.body.date,
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure
    };
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
    logger.debug("New Reading = ", newReading);
  },

  async addReport(request, response) { // This is the report that auto generates data from the latitude and longitude you input.
    logger.info("rendering new report");
    let report = {};
    const lat = request.body.lat;
    const lng = request.body.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=a5da32b151136af39d1f33777a449fc7`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i=0; i<trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        console.log(date);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` );
      }
    }
    const viewData = {
      title: "Weather Report",
      reading: report
    };
    response.render("station", viewData);
  }
};

module.exports = station;
