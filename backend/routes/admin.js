const express = require('express');
const router = express.Router();
const {
    getPendingFarmers,
    approveFarmer,
    rejectFarmer,
} = require('../contoller/admin.Controller');
const { authMiddleware, adminMiddleware } = require("../middleware/authmiddleware");

router.get('/farmers/pending',authMiddleware,adminMiddleware,  getPendingFarmers);
router.put('/farmers/approve/:id',authMiddleware,adminMiddleware ,approveFarmer);
router.delete('/farmers/reject/:id',authMiddleware,adminMiddleware, rejectFarmer);

module.exports = router;