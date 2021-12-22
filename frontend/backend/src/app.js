//defino servidor
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');

// settings
app.set('port', process.env.PORT || 3000)
//si no existe variable de entorno de puerto, tome valor 3000

// middlewares
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())//ahora servidor entendera formato json

//static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/tools', require('./routes/tools'))
app.use('/api/reports', require('./routes/reports'))


module.exports = app;