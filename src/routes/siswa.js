const express = require ("express")
const router = express.Router()

const siswaController = require("../controllers/siswa")
// const{authToken} = require ("../middleware/auth")
// const{roleAuth} = require ("../middleware/roleAuth")

router.post('/postSiswa',siswaController.postSiswa)
router.get('/dashboardsiswa',siswaController.getSiswa)
router.get('/editsiswa/:id',siswaController.getSiswaById)
router.post('/editsiswa/:id',siswaController.UpdateSiswa)
router.delete('/deleteSiswa/:id',siswaController.deleteSiswa)



module.exports = router