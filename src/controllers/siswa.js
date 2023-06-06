const { siswa } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require('moment');

exports.getSiswa =  async(req, res) =>{
    try{
        const data = await siswa.findAll({
        
            attributes: {
                exclude : ["createdAt", "updatedAt"]
            }
        })
        res.render('pages/dashboardsiswa', {data, moment: moment})
        // res.send({
        //     status: 200,
        //     message: 'running well',
        //     data: data
        // })
    } catch (err){
        console.error(err)
    }
}

exports.getSiswaById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = [];
    
        if (data[0] == null) {
          const userData = await siswa.findOne({
            where: {
              id,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          });
    
          if (userData == undefined || userData == null) {
            return res.status(400).send({
              message: `id siswa ${id} tidak ditemukan`,
            });
          }
    
    //       console.log("USER DATA: ", userData);
    //   return res.status(200).send({
    //         message: `data id ${id}`,
    //         data: userData,
    //       });
        return res.render('pages/editsiswa', {data:userData, moment: moment })
        }
      } catch (error) {
        // logger.error(error.message);
        console.log(error);
        return res.send({
          status: 500,
          message: "Internal server error!",
        });
      }
    };

    exports.UpdateSiswa = async(req, res) => {
      try{        
          const update = await siswa.update({
              nama: req.body.nama,
              tanggalLahir: req.body.tanggalLahir,
              kelas: req.body.kelas,
              alamat:req.body.alamat,
              tempat:req.body.tempat,
              noTelp:req.body.noTelp,
              namaOrtu:req.body.namaOrtu,
              noTelpOrtu:req.body.noTelpOrtu

          },
          {
              where: {
                  id: req.params.id
              },
              returning: true
          })
          const panggil = await siswa.findOne({ 
              where: {id: req.params.id}
          })
          if(!panggil){
              return res.status(404).send({
                  message: 'data tidak ditemukan'
              })
          }
        //   res.send({
        //       status:200,
        //       message: 'berhasil update data!',
        //       data: panggil
        //   })
        res.redirect('/dashboardsiswa')
      }catch (err){
          console.error(err)
      }
  } 


exports.postSiswa = async(req, res) => {
    try {

        const data = req.body
        const schema = joi.object({
            nama: joi.string().min(3).required(),
            tanggalLahir: joi.date().format("DD/MM/YYYY"),
            tempatLahir: joi.string().min(1).required(),
            // tanggalLahir: joi.date().required(),
            kelas: joi.string().min(1).required(),
            alamat: joi.string().min(1).required(),
            noHp: joi.string().min(1).required(),
            namaOrtu: joi.string().min(1).required(),
            noHpOrtu: joi.string().min(1).required()
           
            // email: joi.string().email().required(),
            // password: joi.string().min(8).required(),
            // role: joi.string()
        })
       
        const {error} = schema.validate(data)
        // logger.info("sukses register")
        
        if(error){
            // logger.error(error.message)
            console.log(error.details)
            return res.status(400).send({
                message: error.details[0].message
            })
        }
        
        const save = await siswa.create({
             nama: req.body.nama,
              tanggalLahir: req.body.tanggalLahir,
              tempatLahir:req.body.tempatLahir,
              kelas: req.body.kelas,
              alamat:req.body.alamat,
              noHp:req.body.noHp,
              namaOrtu:req.body.namaOrtu,
              noHpOrtu:req.body.noHpOrtu
        })
        // console.log(save);

        const simpan = await siswa.findOne({
            where : {id:save.id},
            // attributes: {
            //     exclude : ["password"]
            // }
        })
        console.log(simpan);
        // return res.redirect('/dashboard')
        res.send({
            status: 200,
            message: 'berhasil simpan',
            data: simpan
        })
    } catch (err) {
        console.error(err);
    }
}

exports.deleteSiswa = async(req, res) => {
    try {
        const call = await siswa.findOne({
            where: {id: req.params.id}
        })
        if(!call){
            return res.status(404).send({
                message: 'data tidak ditemukan'
            })
        }
        
        let del = await siswa.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            message: 'berhasil hapus data',
        })
    }catch (err){
        console.error(err)
    }
}
// exports.login = async (req,res) =>{
//     try{
//         const body = req.body

//         const schema = joi.object({
//             email: joi.string().email().required(),
//             password: joi.string().min(5).required()
//         })

//         const { error } = schema.validate(body)

//         if(error){
//             console.log(error)
//             return res.status(400).send({
//                 message: error.details[0].message
//             })
//         }

//         let dataLogin = await login.findOne({
//             where: {
//                 email: req.body.email
//             }
//         })

//         if(!dataLogin){
//             return res.status(400).send({
//                 message: 'Email doesnt match'
//             })
//         }
//         const match = await bcrypt.compare(req.body.password, dataLogin.password)
//         if(!match){
//             return res.status(400).send({
//                 message: ' password doesnt match'
//             })
//         }

//         let dataloginid = await login.findOne({
//             where: {
//                 email: req.body.email
//             },
//             attributes: {
//                 exclude: ["createdAt", "updatedAt", "password"]
//             }
//         })

//         const accessToken = jwt.sign({
//             id: dataloginid.id
//         },
//         process.env.ACCESS_TOKEN_SECRET
//         )

//         res.status(200).send({
//             message: 'berhasil login', 
//             data: dataloginid,
//             token: accessToken
//         })
//     }catch (err){
//         console.error(err)
//     }
// }

// exports.delete = async (req, res) => {
//     try{
//         const getId = await login.findOne({
//             where: {
//                 id: req.params.id
//             }
//         })

//         if(!getId){
//             return res.status(404).send({
//                 message: 'id tidak ditemukan'
//             })
//         }

//         const del = await login.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })

//         return res.redirect('/login')
//     }catch(err){
//         console.error(err)
//     }
// }
