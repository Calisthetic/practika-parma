const Router = require('express')
const userController = require('../controllers/user.controller')
const testController = require('../controllers/test.controller')
const resultController = require('../controllers/result.controller')
const questionController = require('../controllers/question.controller')
const divisionController = require('../controllers/division.controller')
const testForDivisionController = require('../controllers/test_for_division.controller')
const router = new Router()

router.get('' || '/', (req, res) => {
    res.json("Server works now, are you?");
})
router.post('/user', userController.createUser)
router.get('/user', userController.getUsersByDivision) //! All || by division
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

router.post('/test', testController.createTest)
router.get('/test/:id', testController.getOneTest)
router.get('/test', testController.getTestsByUserId) //! All || by user_id
router.put('/test', testController.updateTest)
router.delete('/test/:id', testController.deleteTest)

router.post('/quest', questionController.createQuest)
router.get('/quest', questionController.getQuestsByTest)
router.put('/quest', questionController.updateQuest)
router.delete('/quest/:id', questionController.deleteQuest)

router.post('/result', resultController.createResult)
router.get('/result', resultController.getResultsByUserOrTest) // !All || by user_id || by test_id
router.delete('/result/:id', resultController.deleteRusult)

router.post('/division', divisionController.createDivision)
router.get('/division', divisionController.getDivisions) //! All || by user_id
router.get('/division/:id', divisionController.getOneDivision)
router.put('/division', divisionController.updateDivision)
router.delete('/division/:id', divisionController.deleteDivision)

router.post('/tfd', testForDivisionController.createTest)
router.get('/tfd', testForDivisionController.getTFDs)
router.delete('/tfd/:id', testForDivisionController.deleteTest)

module.exports = router