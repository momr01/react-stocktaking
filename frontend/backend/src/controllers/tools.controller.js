const toolsCtrl = {}

const Equipo = require('../models/Tools')

toolsCtrl.getTools = async (req, res) => {
    const tools = await Equipo.find()
    res.json(tools)

}

toolsCtrl.createTool = async (req, res) => {
    const { equipo, marca, numero, serie, modelo, estado, responsable, recepcion, accesorios } = req.body
    const newTool = new Equipo({
        equipo, 
        marca, 
        numero, 
        serie, 
        modelo, 
        estado, 
        responsable,
        recepcion,
        accesorios
    })
    await newTool.save()
    res.json({message: 'Equipo cargado correctamente'})
}

toolsCtrl.updateTool = async (req, res) => {
    const { equipo, marca, numero, serie, modelo, estado, recepcion, responsable, accesorios } = req.body
    await Equipo.findByIdAndUpdate(req.params.id, {
        equipo, 
        marca, 
        numero, 
        serie, 
        modelo, 
        estado, 
        responsable,
        recepcion,
        accesorios
    })
    
    res.json({message: 'Equipo actualizado con éxito'})
}

toolsCtrl.deleteTool = async (req, res) => {
    const tool = await Equipo.findByIdAndDelete(req.params.id)

    res.json({message: 'Equipo eliminado'})

}

toolsCtrl.getTool = async (req, res) => {
    const tool = await Equipo.findById(req.params.id)
    res.json(tool)
}

module.exports = toolsCtrl
