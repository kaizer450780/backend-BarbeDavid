const {response} = require('express')
const Event =require('../models/Event')
const User=require('../models/User')
const {generateJwt}=require('../helpers/jwt')



const getEvents= (req,res=response)=>{
    res.json({
        ok:true,
        msg:'get exitoso'
    })
}

const createEvent= async(req,res=response)=>{

    const event = new Event(req.body)

    try {

        event.user=req.uid

        const eventSaved= await event.save()

        res.status(201).json({
            ok:true,
            cita:eventSaved
       })
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            ok:false,
            msg:'Error interno comuniquese con el administrador 3116537985'
        })
        
    }

    res.json({
        ok:true,
        msg:'create exitoso'
    })
}

const updateEvents= async(req,res=response)=>{
    res.json({
        ok:true,
        msg:'update exitoso'
    })
}

const deleteEvents= async(req,res=response)=>{
    res.json({
        ok:true,
        msg:'delete exitoso'
    })
}

module.exports={
    getEvents,
    createEvent,
    updateEvents,
    deleteEvents
}