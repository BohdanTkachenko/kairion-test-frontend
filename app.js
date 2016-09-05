const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();

app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);

app.use('/api', proxy({
  target: 'http://127.0.0.1:9000',
  pathRewrite: { '^/api': '' },
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.render('index.html');
});

app.listen(3000, (err) => {
  if (err) {
    throw err;
  }

  console.log('Frontend server is listening on port 3000'); // eslint-disable-line no-console
});
