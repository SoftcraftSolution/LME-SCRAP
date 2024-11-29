const express = require('express');
const router = express.Router();
const lmescrapwatchlistcontroller=require('../controller/lmescrapcontroller')
router.get('/lme-metal-data',lmescrapwatchlistcontroller.getMetalData)
//

module.exports = router;
