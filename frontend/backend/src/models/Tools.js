const { Schema, model } = require('mongoose')

const toolSchema = new Schema({
    equipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    serie: {
        type: String,
        required: true
    }, 
    modelo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    responsable: {
        type: String,
        required: true
    },
    recepcion: {
        type: Date,
        default: Date.now
    },
    accesorios: {
        type: String,
        required: true
    }

})

module.exports = model('Equipo', toolSchema)