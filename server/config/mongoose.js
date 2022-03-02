const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(
  config.mongo.host,
  {
    useNewUrlParser: true, // <-- no longer necessary
    useUnifiedTopology: true, // <-- no longer necessary
  },
  (err) => {
    if (!err) console.log("MongoDB connection successfully");
    else console.log(`MongoDB connection failed : ${err}`);
  }
);
module.exports = mongoose;
