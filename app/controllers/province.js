/* global _ */

'use strict'

const async = require('async')
const request = require('request')
const provinceModel = require('../models/province')

exports.getData = (req, res) => {
  const options = {
    url: 'https://api.rajaongkir.com/starter/province',
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
    (dataProvince, cb) => {
      const data = dataProvince.rajaongkir.results
      async.eachSeries(data, (item, next) => {
        let datas = {
          provinceId: item.province_id,
          province: item.province
        }
        provinceModel.insertAPI(req, datas, (errProvince) => {
          if (errProvince) console.error(errProvince)
          console.log(item)
        })
        next()
      }, err => {
        cb(err, dataProvince)
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


