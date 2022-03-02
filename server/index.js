const mongoose = require("mongoose");

const config = require("./config/config");
require("./config/mongoose");
const app = require("./config/express");

app.listen(config.port, () => {
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Server started on port ${config.port} (${config.env})`
  );
});
