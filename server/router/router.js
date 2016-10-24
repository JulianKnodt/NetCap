const router = require('express').Router();
const readController = require('../controllers/readController');

router.get('/data', readController.get)
      .delete('/clear', readController.delete)
      .post('/verified', readController.verify)
      .get('/verified', readController.getVerified)
      .post('/verifyMany', readController.verifyMany)
      .post('/test', readController.post);

module.exports = router;