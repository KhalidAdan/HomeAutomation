const HueDAO = require("./Hue/hue");

const express = require("express");
const app = express();
const port = 3000;

app.get("/devices", function (req, res) {
  HueDAO.fetchLights((response) => {
    res.json({
      message: "returned all lights and full json reponse from bridge",
      data: response.data,
    });
  });
});

app.get("/device/:id/dim", function (req, res) {
  const device = req.params.id;
  const resp = HueDAO.dimLight(device, (response) => {
    res.json({
      message: "light dimmed",
      data: {
        state: {
          on: response.state.on,
          bri: response.state.bri,
        },
      },
    });
  });
});

app.get("/device/:id/brighten", function (req, res) {
  const device = req.params.id;
  const resp = HueDAO.brightenLight(device, (response) => {
    res.json({
      message: "light brightened",
      data: {
        state: {
          on: response.state.on,
          bri: response.state.bri,
        },
      },
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
