const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const path = require('path');

const Provider = require('../helper/Provider');

const InvalidLocationParameterError = require('../errors/InvalidLocationParameterError');
const InvalidDayParameterError = require('../errors/InvalidDayParameterError');

function getDays(request, response) {
  console.log('getDays: request-params=', request.params);
  try {
    const data = Provider.getDays();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

function getLocations(request, response) {
  console.log('getLocations: request-params=', request.params);
  try {
    const data = Provider.getLocations();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

function getIngredients(request, response) {
  console.log('getIngredients: request-params=', request.params);

  try {
    const data = Provider.getIngredients();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

function getIngredientsForKey(request, response) {
  console.log('getIngredientsForKey: request-params=', request.params);

  try {
    const data = Provider.getIngredientsForKey(request.params.key);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

function getItems(request, response) {
  console.log('getItems: request-params=', request.params);

  try {
    const data = Provider.getItems();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error });
  }
}

function getItemsOnLocation(request, response) {
  console.log('getItemsOnLocation: request-params=', request.params);

  try {
    const [location] = [request.params.location];

    if (!Provider.isValidLocation(location)) {
      throw new InvalidLocationParameterError(location);
    }

    const data = Provider.getItemsOnLocation(request.params.location);
    response.status(200).json(data);
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

function getItemsOnLocationForDay(request, response) {
  console.log('getItemsOnLocationForDay: request-params=', request.params);

  try {
    const [location, day] = [request.params.location, request.params.day];

    if (!Provider.isValidLocation(location)) {
      throw new InvalidLocationParameterError(location);
    }

    if (!Provider.isValidDay(day)) {
      throw new InvalidDayParameterError(day);
    }

    const data = Provider.getItemsOnLocationForDay(location, day);
    response.status(200).json(data);
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

function toDocs(request, response) {
  response.redirect(301, '/api-docs');
}

function addRoutes(app) {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  const swaggerDocument = YAML.load(path.resolve('./api/swagger/api.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
  }));

  app.route('/')
    .get(toDocs);

  app.route('/api/days')
    .get(getDays);

  app.route('/api/locations')
    .get(getLocations);

  app.route('/api/ingredients')
    .get(getIngredients);

  app.route('/api/ingredients/:key')
    .get(getIngredientsForKey);

  app.route('/api/items')
    .get(getItems);

  app.route('/api/items/:location')
    .get(getItemsOnLocation);

  app.route('/api/items/:location/:day')
    .get(getItemsOnLocationForDay);
}

module.exports = addRoutes;
