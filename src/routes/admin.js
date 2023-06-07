const express = require ("express")
const router = express.Router()

const adminControllers = require("../controllers/admin")
// const{authToken} = require ("../middleware/auth")
// const{roleAuth} = require ("../middleware/roleAuth")

router.post('/create',adminControllers.postSiswa)
router.post('/register',adminControllers.registerAdmin)
router.get('/creates',adminControllers.creates)
router.get('/registrasisiswa',adminControllers.registrasisiswa)
router.post('/registrasisiswa2',adminControllers.registrasisiswa2)
router.get('/',adminControllers.index)
router.get('/loginadmin',adminControllers.logins)
router.post('/login',adminControllers.login)
router.get('/loginsiswapage',adminControllers.loginSiswaPage)
router.post('/loginsiswa',adminControllers.loginSiswa)
router.get('/dashboardadmin',adminControllers.getSiswa)
router.get('/edit/:id',adminControllers.getSiswaById)
router.post('/edits/:id',adminControllers.UpdateSiswabyAdmin)
router.get('/delete/:id',adminControllers.deleteSiswa)


module.exports = router