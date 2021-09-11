"use strict";

const _ = require("lodash");
const JsonStore = require('./json-store');

const stationStore = {
  
  store: new JsonStore('./models/station-store.json', { stationCollection: [] }),
  collection: 'stationCollection',

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
    getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
    removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId});
    this.store.save();
  },
  
    removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },
  
  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
    addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },
  
  /*addReport(id, report) {
    const station = this.getStation(id);
    station.readings.push(report);
    this.store.save();
  },*/
  
  addStation(station) {
  this.store.add(this.collection, station);
  this.store.save();
  },
  
    getReading(id, readingId) {
    const playList = this.store.findOneBy(this.collection, { id: id });
    const readings = playList.readings.filter(reading => reading.id == readingId);
    return readings[0];
  },

  updateReading(reading, updateReading) {
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
