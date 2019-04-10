'use strict'

module.exports = {
  insertAPI: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO city_tab SET ?`, [data], (err) => {
        callback(err)
      })
    })
  },
  search: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM city_tab ct JOIN province_tab pt ON ct.province_id = pt.provinceId WHERE ct.city_id = ${id}`, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}