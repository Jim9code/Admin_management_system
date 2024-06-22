const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// gets evry user
router.get('/', userController.view)
router.post('/', userController.find)

router.get('/adduser', userController.addform)
router.post('/adduser', userController.created)

router.get('/edituser/:id', userController.editform)
router.post('/edituser/:id', userController.edited)

router.get('/deleteuser/:id',userController.delete)
router.post('/deleteuser/:id', userController.deleted)

router.get('/viewuser/:id',userController.viewmore)




module.exports = router;