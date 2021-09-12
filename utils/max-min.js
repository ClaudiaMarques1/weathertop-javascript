'use strict';

const maxMin = {
  getMinTemp(station) { // This is the smallest temperature reading calculation
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (parseFloat(station.readings[i].temperature) < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },

  getMaxTemp(station) { // This is the largest temperature reading calculation
    let maxTemp = null;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (parseFloat(station.readings[i].temperature) > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

    getMinPressure(station) { // This is the smallest pressure reading calculation
      let minPressure = null;
      if (station.readings.length > 0) {
        minPressure = station.readings[0].pressure;
        for (let i = 1; i < station.readings.length; i++) {
          if (parseFloat(station.readings[i].pressure) < minPressure) {
            minPressure = station.readings[i].pressure;
          }
        }
      }
      return minPressure;
    },

    getMaxPressure(station) { // This is the largest pressure reading calculation
      let maxPressure = null;
      if (station.readings.length > 0) {
        maxPressure = station.readings[0].pressure;
        for (let i = 1; i < station.readings.length; i++) {
          if (parseFloat(station.readings[i].pressure) > maxPressure) {
            maxPressure = station.readings[i].pressure;
          }
        }
      }
      return maxPressure;
    },

  getMinWindSpeed(station) { // This is the smallest wind speed reading calculation
    let minWindSpeed = null;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (parseFloat(station.readings[i].windSpeed) < minWindSpeed) {
          minWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return minWindSpeed;
  },

  getMaxWindSpeed(station) { // This is the largest wind speed reading calculation
    let maxWindSpeed = null;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (parseFloat(station.readings[i].windSpeed) > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windSpeed;
        }
      }
    }
    return maxWindSpeed;
  },
  
};

module.exports = maxMin;