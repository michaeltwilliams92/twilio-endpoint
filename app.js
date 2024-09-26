const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())

app.post('/saveSMSCode', routes.saveSMSCode)
app.get('/getSMSCode', routes.getSMSCode)



app.listen(process.env.PORT || 3000)