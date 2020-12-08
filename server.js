const express = require('express');
const bodyparser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyparser.json())
app.use(express.static(__dirname + "/app/dist/app"))
app.use(express.static(__dirname + "/app/src/data"))

app.get("*", (req, res, next) => res.sendFile(path.resolve(__dirname + "/app/dist/app/index.html")))

app.listen(8000, () => console.log("Listening on port 8000"));