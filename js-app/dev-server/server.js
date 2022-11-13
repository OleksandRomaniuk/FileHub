import express from 'express';
const app = express();
const port = 3001;

app.post('/login', (req, res) => {
  res.statusCode = 401;
  res.send({token: 'From_dev_server'});
});

app.post('/register', (req, res) => {
  res.statusCode = 422;
  res.send({errors: {'email': ['Error']}});
});

app.listen(port, () => {});
