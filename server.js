require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

const handleSend = (req, res) => {
  const secret_key = process.env.SECRET_KEY;
  const token = req.body.token;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  console.log('token', req.body.token);

  fetch(url, {
    method: "post",
  })
    .then((response) => {
      const result = response.json();

      return result;
    })
    .then((google_response) => {
      const response = res.json({ google_response });
      // console.log("res 1", response);
      return response;
    })
    .catch((error) => res.json({ error }));

  // fetch(url, {
  //   method: "post",
  // })
  //   .then((response) => {
  //     console.log('text', response.text());
  //     const result2 = response.json();
  //     console.log("result 2", result2);
  //     return result2;
  //   })
  //   .then((google_response2) => {
  //     const response2 = res.json({ google_response2 });
  //     console.log('res 2', response2);
  //     // return response2;
  //   })
  //   .catch((error2) => {
  //     const err2 = res.json({ error2 });
  //     console.log("error 2", err2);
  //     // return err2;
  //   });
};

app.post("/send", handleSend);

app.listen(port, () => console.log(`Listening on port ${port}!`));
