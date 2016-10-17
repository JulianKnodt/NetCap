const router = require('express').Router();
const readController = require('../controllers/readController');

router.get('/data', readController.get);