const express = require('express')
const cors = require('cors')
require('dotenv').config();
const userRouter = require('./routers/user')
const assetRouter = require('./routers/asset')
const requestRouter = require('./routers/request')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(assetRouter)
app.use(requestRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
