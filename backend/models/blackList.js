const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const BlacklistModel = mongoose.model("blacklist", BlacklistSchema);

module.exports = BlacklistModel;
