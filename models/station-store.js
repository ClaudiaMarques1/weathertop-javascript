 "use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() { // This returns all stations in the collection.
    return this.store.findAll(this.collection);
  },

  getStation(id) { // This returns the station ID under the current user.
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid) { // This returns all stations in the collection under the current user.
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeReading(id, readingId) { // This lets you remove a reading
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  removeStation(id) { // This lets you remove a station
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() { // This lets you remove all stations
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) { // This lets you add a reading
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },
  
  addStation(station) { // This lets you add a station
    this.store.add(this.collection, station);
    this.store.save();
  },

  getReading(id, readingId) { // This lets you get a reading
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings.filter(
      reading => reading.id == readingId
    );
    return readings[0];
  },

  updateReading(reading, updateReading) { // This lets you update the readings
    reading.date = updateReading.date;
    reading.code = updateReading.code;
    reading.temperature = updateReading.temperature;
    reading.windSpeed = updateReading.windSpeed;
    reading.windDirection = updateReading.windDirection;
    reading.pressure = updateReading.pressure;

    this.store.save();
  }
};

module.exports = stationStore;
