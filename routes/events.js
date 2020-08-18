const {Router} = require('express');
const {check}=require('express-validator')

const {isDate}=require('../helpers/isDate')
const {validateFields}=require('../middlewares/validate-fields')
const {getEvents,createEvent,updateEvents,deleteEvents}=require('../controllers/events')
const {validateJWT}=require('../middlewares/validate-jwt')

const router= Router();


//validar token
router.use(validateJWT)

router.get('/',getEvents)

router.post(   
    '/',
    [
        check('title','El title es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatoria').custom(isDate),
        check('end','La fecha de finalizacion es obligatoria').custom(isDate),
        validateFields
    ],
    createEvent)

router.put('/:id',[
    check('title','El title es obligatorio').not().isEmpty(),
    check('start','La fecha de inicio es obligatoria').custom(isDate),
    check('end','La fecha de finalizacion es obligatoria').custom(isDate),
    validateFields
],updateEvents)

router.delete('/:id',deleteEvents)

module.exports=router