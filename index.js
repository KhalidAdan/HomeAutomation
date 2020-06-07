const Hue = require("./Hue/hue");

const express = require("express");
const app = express();

app.get("/devices", function (req, res) {
  Hue.fetchLights((response) => {
    res.json({
      message: "gotAllLights",
      data: response.data,
    });
  });
});

app.get("/device/:id/dim", function (req, res) {
  const device = req.params.id;
  const resp = Hue.wakeUp(device, (response) => {
    res.json({
      message: "light dimmed",
      data: response,
    });
  });
});

app.listen(3000);
