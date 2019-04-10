/* global SearchControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  // .all('/*', AuthHelper.requiresAuthorization)
  .get('/provinces', SearchControllers.searchProvince)
  .get('/cities', SearchControllers.searchCity)

module.exports = Route