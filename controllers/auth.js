const {response} = require('express')
const User=require('../models/User')


const loginUser= (req,res=response)=>{

    const {nameUser,password}=req.body

    res.json({
        ok:true,
        msg:'login',
        nameUser,
        password
   })
}
const createUser= async(req,res=response)=>{

    //const {nameUser,email,password}=req.body

    try {

        const user = new User(req.body)
        await user.save()
    
        res.status(201).json({
            ok:true,
            msg:'registered'
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