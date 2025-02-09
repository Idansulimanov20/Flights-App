const flight = require('./flightModel');
const getAll = async function (req, res) {
    try {
        const data = await flight.find({})
        res.status(200).json({
            success: true,
            data: data
        })
    }
    catch (err) {
        res.status(404).json({
           succees:false,
            message: "error:😱" + err
        })
    }
}
const getById = async function (req, res, next) {
    try {
        let id = req.params.id;
        const data = await flight.findById(id)
        res.status(200).json({
            succees:true,
            data: data
        })
        if(!data)
            return res.status(404).json({succees:false, error:"flight not found"})
    }
    catch (err) {
        res.status(404).json({
           succees:false,
            message: "error:😱" + err
        })
    }
}
const addOne = async function (req, res) {
    try {
        let newFlightInfo = req.body;
        const newFlight = await flight.create(newFlightInfo);
        res.status(201).json({
            succees:true,
            data: newFlight
        })
    }
    catch (err) {
        res.status(400).json({
            succees:false,
            message: "error:😱" + err
        })
    }
};
const editOne = async function (req, res) {
    try {
        let id = req.params.id;
        let data = await flight.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!data) {
            return res.status(404).json({ succees:false, message: "flight not found" });
        }
        res.status(200).json({ success:true, data });
    } catch (err) {
        res.status(400).json({ succees:false, message: `error:😱 ${err}` });
    }
};

const removeOne = async function (req, res) {
    try {
        let id = req.params.id;
        let data = await flight.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ succees:false, message: "flight not found" });
        }
        res.status(200).json({ succees:true, data: null });
    } catch (err) {
        res.status(400).json({ succees:false, message: `error:😱 ${err}` });
    }
};

module.exports = {getAll , getById , addOne , editOne ,removeOne};
