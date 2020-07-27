const {Router} = require('express');
const {check}=require('express-validator')
const {validateFields}=require('../middlewares/validate-fields')
const router= Router();

const {createUser,loginUser,renewToken}=require('../controllers/auth')

router.post(
    '/',
    [//middleware
        check('nameUser','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatorio').not().isEmpty(),
        check('password','La contraseña debe tener mas de 6 digitos').isLength({ min: 6 }),
        validateFields
    ],
    loginUser);

router.post(
    '/new',
    [
        check('nameUser','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El email debe ser tipo email ejemplo@correo.com').isEmail(),
        check('password','La contraseña es obligatorio').not().isEmpty(),
        check('password','La contraseña debe tener mas de 6 digitos').isLength({ min: 6 }),
        validateFields
    ],
    createUser);

router.get('/renew',renewToken);

module.exports=router;