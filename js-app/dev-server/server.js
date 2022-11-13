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

app.get('/getUser', (req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.send({userName: 'Artem Semenov'});
  }, 1000);
});

app.listen(port, () => {});
