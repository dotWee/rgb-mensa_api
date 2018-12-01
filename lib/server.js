const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const mensaProxy = require('./helper/Proxy');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// add controller
require('./controllers/RestfulExpress')(app);

app.listen(port);

// define update job
function updateLocal() {
  console.log('Updating local cache...');
  mensaProxy.updateCache();
}
setInterval(updateLocal, 1000 * 60 * 60 * 24);

// and execute update on startup
updateLocal();

console.log(`Server started on port: ${port}`);
console.log(`Try http://localhost:${port}/mensa/uni/today`);
