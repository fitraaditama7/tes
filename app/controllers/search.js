/* global _ */

'use strict'

const async = require('async')
const provinceModel = require('../models/province')
const cityModel = require('../models/city')

exports.searchProvince = (req, res) => {
  const id = _.result(req.query, 'id')
  provinceModel.search(req, id, (errSearch, resultSearch) => {
    if (_.isEmpty(resultSearch) || errSearch) {
      return MiscHelper.errorCustomStatus(res, { message: 'Data not found' }, 400)
    } else {
      return MiscHelper.responses(res, resultSearch)
    }
  })
}

exports.searchCity = (req, res) => {
  const id = _.result(req.query, 'id')
  cityModel.search(req, id, (errSearch, resultSearch) => {
    if (_.isEmpty(resultSearch) || errSearch) {
      return MiscHelper.errorCustomStatus(res, { message: 'Data not found' }, 400)
    } else {
      return MiscHelper.responses(res, resultSearch)
    }
  })
}