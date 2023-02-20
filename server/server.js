const express = require('express')

const Router = require('./routes/app.routes')

const app = express()

app.use(express.json())

app.use('/api', Router)

// app.get("/api", (req, res) => {
    //res.json({"users": ["userOne", "userTwo"] })
//})

app.listen(8080, () => console.log("Server started")) 
