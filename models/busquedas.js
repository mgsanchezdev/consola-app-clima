const axios = require("axios");
class Busquedas {
  constructor() {}
  async ciudad(lugar = "") {
    try {
      const respuesta = await axios.get("https://reqres.in/api/users?page=2");
      console.log(respuesta.data);
      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
