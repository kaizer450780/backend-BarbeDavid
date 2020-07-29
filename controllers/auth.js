const {response} = require('express')
const bcrypt =require('bcryptjs')
const User=require('../models/User')


const loginUser= async(req,res=response)=>{

    const {nameUser,password}=req.body

    try {

        const user =await User.findOne({nameUser})

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no se encuentra registrado'
            })
        }    
        
        //confirmar password
        const validPassword =bcrypt.compareSync(password,user.password)

        if(!validPassword){
            res.status(400).json({
                ok:false,
                msg:'Contraseña incorrecta'
            })
        }

        //generarJWT
        res.json({
            ok:true,
            uid: user.id,
            name: user.nameUser
       })
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            ok:false,
            msg:'Error interno comuniquese con el administrador 3116537985'
        })
    }
}

const createUser= async(req,res=response)=>{

    const {nameUser,email,password}=req.body

    try {

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario ya existe con el correo ingresado'
            })
        }

        user =await User.findOne({nameUser})

        if(user){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe agregue algo mas al nombre de usuario ingresado'
            })
        }

        user = new User(req.body)

        //encriptar contraseña
        const salt= bcrypt.genSaltSync()
        user.password=bcrypt.hashSync(password,salt)

        await user.save()

        //generarJWT
        res.json({
            ok:true,
            uid: user.id,
            name: user.nameUser
       })
    
        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.nameUser
       })

    } catch (error) {

        console.log(error)
        
        res.status(500).json({
            ok:false,
            msg:'Error interno comuniquese con el administrador 3116537985'
        })
    }
}

const renewToken= (req,res=response)=>{
    res.json({
        ok:true,
        msg:'renew'
   })
}


module.exports={
    createUser,
    loginUser,
    renewToken
}