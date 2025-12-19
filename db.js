const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/urlShortner")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));
