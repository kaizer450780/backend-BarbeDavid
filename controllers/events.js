const {response} = require('express')
const Event =require('../models/Event')
var moment    = require('moment');
const User=require('../models/User')
const {generateJwt}=require('../helpers/jwt')



const getEvents= async(req,res=response)=>{

    const events= await Event.find()
                            .populate('user','nameUser')

    res.json({
        ok:true,
        events
    })
}

const createEvent= async(req,res=response)=>{


    const event = new Event(req.body)

    try {

        const events= await Event.find()
        const dateEventStart =req.body.start

        for(let eventIt in events){

            console.log(dateEventStart)
            console.log(events[eventIt].start)

            if(moment(dateEventStart).isBetween(events[eventIt].start,events[eventIt].end) 
                || moment(dateEventStart).isSame(events[eventIt].start)){

                return res.status(400).json({
                    ok:false,
                    msg:'La fecha y hora que deseas reservar esta ocupado'
                })

            }
        }

        event.user=req.uid
        event.start=moment(event.start).subtract('5','hour')
        event.end=moment(event.end).subtract('5','hour')

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