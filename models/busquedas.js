const fs = require("fs");
const axios = require("axios");
class Busquedas {
  historal = [];
  dbPath = "./db/database.json";
  constructor() {}
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }
  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
  agregarHistorial(lugar = "") {
    if (this.historal.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historal.unshift(lugar.toLocaleLowerCase());

    //Grabr en DB.
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historal,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {}
}

module.exports = Busquedas;
