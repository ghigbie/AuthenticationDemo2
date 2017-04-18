const mongoose = require("mongoose");

const userScehma = new mongoose.Schema({
   username: String,
   password: String,
});

module.exports = mongoose.model("User", userScehma);