const key = "eqechwqzuhOy9BxUjH4vdWRuOYLK3XNXEksJ7YWZ";
const hueBridgeURL = "http://192.168.0.10";

const axios = require("axios");

class Hue {

  async fetchLights(callback) {
    const rsp = await axios.get(`${hueBridgeURL}/api/${key}/lights`);
    callback(rsp);
  }

  async fetchLight(id) {
    const rsp = await axios.get(`${hueBridgeURL}/api/${key}/lights/${id}`);
    let light = rsp.data;
    return light;
  }

  async wakeUp(id, callback) {
    let data = {
      on: true,
      bri: 1,
    };
    const rsp = await axios.put(
      `${hueBridgeURL}/api/${key}/lights/${id}/state`,
      data
    );
    callback(await this.fetchLight(id));
  }
}

const hueClient = new Hue();
exports = module.exports = hueClient;
