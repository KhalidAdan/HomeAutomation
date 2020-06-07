
const axios = require("axios");
require('dotenv').config();


class Hue {

  async fetchLights(callback) {
    const rsp = await axios.get(`${process.env.hueBridgeURL}/api/${key}/lights`);
    callback(rsp);
  }

  async fetchLight(id) {
    const rsp = await axios.get(`${process.env.hueBridgeURL}/api/${process.env.key}/lights/${id}`);
    let light = rsp.data;
    return light;
  }

  async wakeUp(id, callback) {
    let data = {
      on: true,
      bri: 101,
    };
    const rsp = await axios.put(
      `${process.env.hueBridgeURL}/api/${process.env.key}/lights/${id}/state`,
      data
    );
    callback(await this.fetchLight(id));
  }
}

const hueClient = new Hue();
exports = module.exports = hueClient;
