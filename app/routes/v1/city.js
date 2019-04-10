/* global CityControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', CityControllers.getData)

module.exports = Route