const express = require ("express")
const router = express.Router()

const adminControllers = require("../controllers/admin")

router.post('/create',adminControllers.postSiswa)
router.post('/register',adminControllers.registerAdmin)
router.get('/creates',adminControllers.creates)
router.get('/',adminControllers.logins)
router.post('/login',adminControllers.login)
router.get('/dashboardadmin',adminControllers.getSiswa)
router.get('/edit/:id',adminControllers.getSiswaById)
router.post('/edits/:id',adminControllers.UpdateSiswabyAdmin)
router.get('/delete/:id',adminControllers.deleteSiswa)


module.exports = router