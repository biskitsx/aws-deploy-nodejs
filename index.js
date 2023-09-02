import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.PORT
})

const app = express()

app.use(cors())

app.get("/", (req, res, next) => {
    res.json({
        msg: "hello world"
    })
})

app.get("/attractions", (req, res, next) => {
    try {
        pool.query("SELECT * FROM attractions", function (err, rows, fields) {
            console.log(err)
            res.json(rows)
        })

    } catch (error) {
        console.log(error)
        res.json({ msg: "error" })
    }
})

app.listen(3000, () => {
    console.log("listen at 3000")
})