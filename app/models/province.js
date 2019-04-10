'use strict'

module.exports = {
  insertAPI: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO province_tab SET ?`, [data], (err) => {
        callback(err)
      })
    })
  },
  search: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM province_tab WHERE provinceId = ${id}`, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}