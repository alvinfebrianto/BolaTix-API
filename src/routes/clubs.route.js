const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/clubs.controller');

router.get('/', clubsController.getClubs);

module.exports = router;
