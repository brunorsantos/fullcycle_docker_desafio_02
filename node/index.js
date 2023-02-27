const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql = "CREATE TABLE people (name VARCHAR(255))";
connection.query(sql, function (err, result) {
    if (err) {
        console.log("Table already exists")
    } 
    console.log("Table created")
})

sql = `INSERT INTO people(name) values('Bruno')`
const sqlSelect = `SELECT name from people`
connection.query(sql)
connection.end()


app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    const names =  connection.query(sqlSelect)

    let list = '<ul>'
    connection.query(sqlSelect,  (err, results, fields) => {
        if (err) throw err
        results.forEach(result => {
            
            list =`${list} <li>${result.name}</li>`
        })
        list = `${list}</ul>`
        connection.end()
        console.log('lista: ' + list)
        res.send(`<h1>Full Cycle</h1> <br> ${list}`)
      });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})