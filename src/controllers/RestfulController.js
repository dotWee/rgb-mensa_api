const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const swaggerDocument = require('../swagger.json');
const Provider = require('../helper/Provider');

function getIngredients(request, response) {
  console.log(`getIngredients: request=${request}`);

  try {
    const data = Provider.getIngredients();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
}

function getIngredientsForKey(request, response) {
  console.log(`getIngredientsForKey: request=${request}`);

  try {
    const data = Provider.getIngredientsForKey(request.params.key);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
}

function getItems(request, response) {
  console.log(`getItems: request=${request}`);

  try {
    const data = Provider.getItems();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
}

function getItemsOnLocation(request, response) {
  console.log(`getItemsOnLocation: request=${request}`);

  try {
    const data = Provider.getItemsOnLocation(request.params.location);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
}

function getItemsOnLocationForDay(request, response) {
  console.log(`getItemsOnLocationForDay: request=${request}`);

  try {
    const data = Provider.getItemsOnLocationForDay(request.params.location, request.params.day);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
}

function toDocs(request, response) {
  response.redirect(301, '/api-docs');
}

function addRoutes(app) {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
  }));

  app.route('/')
    .get(toDocs);

  app.route('/ingredients')
    .get(getIngredients);

  app.route('/ingredients/:key')
    .get(getIngredientsForKey);

  app.route('/items')
    .get(getItems);

  app.route('/items/:location')
    .get(getItemsOnLocation);

  app.route('/items/:location/:day')
    .get(getItemsOnLocationForDay);
}

module.exports = addRoutes;
