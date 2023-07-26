const express = require("express");
const app = express();

const foods = ["pasta carbonara", "bánh mì", "cucumber salad"];

app.get("/foods/:index", (req, res, next) => {
  if (foods[req.params.index]) {
    res.send(req.params.index);
  } else {
    const err = Error("Invalid index!");
    err.status = 404;
    next(err);
  }
});

const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    err.status = 500 ;
  }
  res.status(err.status).send(err.message);
};

app.use(errorHandler);

app.listen(port = 3000, () => console.log(`Example app listening at http://localhost:3000`))
