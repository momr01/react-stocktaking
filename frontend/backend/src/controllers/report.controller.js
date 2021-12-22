const reportCtrl = {}

const Reporte = require('../models/Report')

reportCtrl.getReports = async (req, res) => {
    const reports = await Reporte.find()
    res.json(reports)

}

reportCtrl.createReport = async (req, res) => {
    const { service, remito, fActual, fNext, estado, observaciones, idTool } = req.body

    const newReport = new Reporte({
        service, 
        remito, 
        fActual, 
        fNext, 
        estado, 
        observaciones,
        idTool
    })
    await newReport.save()
    res.json({message: 'Reporte cargado correctamente'})
}

reportCtrl.getReport = async (req, res) => {
    const report = await Reporte.find({idTool: req.params.idTool})
    res.json(report)

}

module.exports = reportCtrl