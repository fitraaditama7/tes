/* global ProvinceControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ProvinceControllers.getData)

module.exports = Route