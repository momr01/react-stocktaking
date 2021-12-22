const { Schema, Schema: {ObjectId}, model } = require('mongoose')

const reportSchema = new Schema({
    service: {
        type: Number,
        required: true
    },
    remito: {
        type: Number,
        required: true
    },
    fActual: {
        type: Date,
        default: Date.now
    },
    fNext: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true
    }, 
    observaciones: {
        type: String,
        required: true
    },
    idTool: { type: ObjectId }
    

})

module.exports = model('Reporte', reportSchema)