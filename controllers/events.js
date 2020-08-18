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

    const eventId= req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Evento con ese id no existe'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tienes permiso para editar esta cita'
            })
        }

        const newEvent ={
            ...req.body,
            user:uid
        }

        const eventUpdated= await Event.findByIdAndUpdate(eventId,newEvent,{new:true})
        
        res.json({
            ok:true,
            event:eventUpdated
        })

        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            ok:false,
            msg:'Error interno comuniquese con el administrador 3116537985'
        })
    }

}

const deleteEvents= async(req,res=response)=>{

    const eventId= req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'Evento con ese id no existe'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tienes permiso para eliminar esta cita'
            })
        }

        await Event.findByIdAndDelete(eventId)
        
        res.json({
            ok:true,
            msg:"Evento eliminado"
        })

        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            ok:false,
            msg:'Error interno comuniquese con el administrador 3116537985'
        })
    }
}

module.exports={
    getEvents,
    createEvent,
    updateEvents,
    deleteEvents
}