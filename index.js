const express = require("express");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
const fs = require("fs");

let secret = fs.readFileSync("secret.key");

app.get("/", (req, res) => {
  res.send("Hello Wosdrld!");
});

app.post("/post", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, (err, Data) => {
    if (err) {
      res.sendStatus(403);
    }
    res.json({
        message: 'post created ...',
        Data
    })
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    email: "new@gmail.com",
    password: "12345",
  };

  jwt.sign({ user }, secret, (err, token) => {
    if (err) {
        res.json({
            message: "something's wrongs !"
        })
    }
    res.json({ token });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
