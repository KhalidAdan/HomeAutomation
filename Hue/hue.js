const axios = require("axios");
require("dotenv").config();

const fetchLights = async (callback) => {
  const rsp = await axios.get(`${process.env.hueBridgeURL}/api/${key}/lights`);
  callback(rsp);
};

const fetchLight = async (id) => {
  const rsp = await axios.get(
    `${process.env.hueBridgeURL}/api/${process.env.key}/lights/${id}`
  );
  let light = rsp.data;
  return light;
};

const wakeUp = async (id, callback) => {
  let data = {
    on: true,
    bri: 200,
  };
  const rsp = await axios.put(
    `${process.env.hueBridgeURL}/api/${process.env.key}/lights/${id}/state`,
    data
  );
  callback(await fetchLight(id));
};

exports = module.exports = { fetchLight, fetchLights, wakeUp };
