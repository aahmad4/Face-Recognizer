const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "bda75ef3baa043dc855a9c30fd071224",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API!"));
};

const handleImage = (req, res, db) => {
  db("users")
    .where("id", "=", req.body.id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Couldn't get entries!"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
