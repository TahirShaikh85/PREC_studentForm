const router = require('express').Router();
const controller = require('../controller/controller');

router.get('/getStudents',controller.getAllStudents);
router.post('/createStudent',controller.createStudent);
router.put('/updateStudent/:studentId',controller.updateStudent);
router.delete('/deleteStudent/:studentId',controller.deleteStudent);

module.exports = router;