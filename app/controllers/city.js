/* global _ */

'use strict'

const async = require('async')
const request = require('request')
const cityModel = require('../models/city')

exports.getData = (req, res) => {
  const options = {
    url: 'https://api.rajaongkir.com/starter/city',
    headers: { 'key' : '0df6d5bf733214af6c6644eb8717c92c'}
  }

  async.waterfall([
    (cb) => {
      request(options, (error, response, body) => {
        if (_.isEmpty(body) || error ) console.error(error)
        console.log(JSON.parse(body))
        cb(null, JSON.parse(body))
      })
    },
    (dataCity, cb) => {
      const data = dataCity.rajaongkir.results
      async.eachSeries(data, (item, next) => {
        let datas = {
          city_id: item.city_id,
          province_id: item.province_id,
          type: item.type,
          city_name: item.city_name,
          postal_code: item.postal_code
        }
        cityModel.insertAPI(req, datas, (errCity) => {
          if (errCity) console.error(errCity)
          console.log(item)
        })
        next()
      }, err => {
        cb(err, dataCity)
      })
    }
  ], (err, result) => {
    if (!err) {
      return MiscHelper.responses(res, {message: 'Data disimpan'})
    } else {
      return MiscHelper.errorCustomStatus(res, err, 400)
    }
  })
}

