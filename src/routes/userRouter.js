const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/list', userController.list);
router.get('/create', userController.create);
router.post('/create', userController.store);
router.get('/edit/:id', userController.edit);
router.put('/edit/:id', userController.update)

module.exports = router