const express = require('express');
const {getAll , getById , addOne , editOne ,removeOne} = require('./flightControler');
const router = new express.Router();
//--------flights router-------------\\
router.get("/",getAll);
router.get("/:id",getById);
router.post("/",addOne);
router.patch("/:id",editOne);
router.delete("/:id",removeOne);
module.exports = router