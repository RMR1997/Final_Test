const { admin } = require("../../models");
const { siswa } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require('moment');
const {data_kelas} = require("../../models");

exports.getSiswa =  async(req, res) =>{
    try{
        const data = await siswa.findAll({
            include: {model : data_kelas},
            order: [
                ["nama", "ASC"],
                                    ],
            attributes: {
                exclude : ["createdAt", "updatedAt"]
            }
        })
        res.render('pages/dashboardadmin', {data,moment:moment})
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
    
        //   console.log("USER DATA: ", userData);
    //   return res.status(200).send({
    //         message: `data id ${id}`,
    //         data: userData,
    //       });
        return res.render('pages/editadmin', {data:userData, moment: moment})
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


    exports.creates = async (req, res) => {
        res.render('pages/create')
    }

    exports.registrasisiswa = async (req, res) => {
        res.render('pages/registrasisiswa')
    }


    exports.UpdateSiswabyAdmin = async(req, res) => {
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
          res.redirect('/dashboardadmin')
      }catch (err){
          console.error(err)
      }
  } 


exports.postSiswa = async(req, res) => {
    try {

        const data = req.body
        const schema = joi.object({
            nama: joi.string().min(3).required(),
            tanggalLahir: joi.date(),
            tempatLahir: joi.string(),
            kelas: joi.string(),
            alamat: joi.string(),    
            noHp: joi.string(),
            namaOrtu: joi.string(),
            noHpOrtu: joi.string()
        })
       
        const {error} = schema.validate(data)
        
        if(error){
            console.log(error.details)
            return res.status(400).send({
                message: error.details[0].message
            })
        }
        
        const save = await siswa.create({
              nama: req.body.nama,
              tanggalLahir: req.body.tanggalLahir,
              tempatLahir: req.body.tempatLahir,
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
        return res.redirect('/dashboardadmin')
        // res.send({
        //     status: 200,
        //     message: 'berhasil simpan',
        //     data: simpan
        // })
    } catch (err) {
        console.error(err);
    }
}

exports.registrasisiswa2 = async(req, res) => {
    try {

        const data = req.body
        const schema = joi.object({
            nama: joi.string().min(3).required(),
            tanggalLahir: joi.date(),
            tempatLahir: joi.string(),
            kelas: joi.string(),
            alamat: joi.string(),    
            noHp: joi.string(),
            namaOrtu: joi.string(),
            noHpOrtu: joi.string()
        })
       
        const {error} = schema.validate(data)
        
        if(error){
            console.log(error.details)
            return res.status(400).send({
                message: error.details[0].message
            })
        }
        
        const save = await siswa.create({
              nama: req.body.nama,
              tanggalLahir: req.body.tanggalLahir,
              tempatLahir: req.body.tempatLahir,
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
        return res.redirect('/')
        // res.send({
        //     status: 200,
        //     message: 'berhasil simpan',
        //     data: simpan
        // })
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
        return res.redirect('/dashboardadmin')
        // res.status(200).json({
        //     message: 'berhasil hapus data',
        // })
    }catch (err){
        console.error(err)
    }
}

exports.index = async(req,res) => {
    try{
        res.render("pages/")
    }catch (err)
    {
        console.error(err)
    }
}

exports.logins = async(req,res) => {
    try{
        res.render("pages/loginadmin")
    }catch (err)
    {
        console.error(err)
    }
}

exports.loginSiswaPage = async(req,res) => {
    try{
        res.render("pages/loginsiswa")
    }catch (err)
    {
        console.error(err)
    }
}

exports.login = async (req,res) =>{
    try{
        const body = req.body

        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(5).required()
        })

        const { error } = schema.validate(body)

        if(error){
            console.log(error)
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        let dataLogin = await admin.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!dataLogin){
            return res.status(400).send({
                message: 'Email doesnt match'
            })
        }
        const match = await bcrypt.compare(req.body.password, dataLogin.password)
        
        if(!match){
            return res.status(400).send({
                message: ' password doesnt match'
            })
        }

        let dataloginid = await admin.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        })

        const accessToken = jwt.sign(
            {id: dataloginid.id},
        process.env.ACCESS_TOKEN_SECRET
        )

        res.cookie("token", accessToken)
        res.redirect("/dashboardadmin")
        // res.status(200).send({
        //     message: 'berhasil login', 
        //     data: dataloginid,
        //     token: accessToken
        // })
    }catch (err){
        console.error(err)
    }
}

exports.loginSiswa = async (req,res) =>{
    try{
        const body = req.body

        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(5).required()
        })

        const { error } = schema.validate(body)

        if(error){
            console.log(error)
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        let dataLogin = await admin.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!dataLogin){
            return res.status(400).send({
                message: 'Email doesnt match'
            })
        }
        const match = await bcrypt.compare(req.body.password, dataLogin.password)
        
        if(!match){
            return res.status(400).send({
                message: ' password doesnt match'
            })
        }

        let dataloginid = await admin.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
            }
        })

        const accessToken = jwt.sign(
            {id: dataloginid.id},
        process.env.ACCESS_TOKEN_SECRET
        )

        res.cookie("token", accessToken)
        res.redirect("/dashboardadmin")
        // res.status(200).send({
        //     message: 'berhasil login', 
        //     data: dataloginid,
        //     token: accessToken
        // })
    }catch (err){
        console.error(err)
    }
}

exports.registerAdmin = async(req, res) => {
    try {

        const data = req.body
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            role: joi.string()
        })
       
        const {error} = schema.validate(data)
       
        
        if(error){

            console.log(error.details)
            return res.status(400).send({
                message: error.details[0].message
            })
        }
        
        const hash = await bcrypt.hash(req.body.password, 10)

        const email = await admin.findOne({
            where: {
                email:req.body.email 
            }
        })

        if(email) {
            return res.status(400).send({
                message: `email sudah di pakai`
            })
        }
        
        const save = await admin.create({
            email: req.body.email,
            password: hash,
            role: req.body.role,
        })
        // console.log(save);

        const simpan = await admin.findOne({
            where : {id:save.id},
            attributes: {
                exclude : ["password"]
            }
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