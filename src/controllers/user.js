const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user.model");

function signUp(req, res){
    const user = new User();
    const {email, password, repeatPassword } = req.body;
    user.email = email;
    user.role = "admin";
    user.active = true;

    //Si no existe alguna de las dos passwords
    if(!password || !repeatPassword){
        res.status(404).send({message: "Las contraseñas son obligatorias"});
    }else {
        if(password !== repeatPassword){
            res.status(404).send({message: "las contraseñas no coinciden"});
        }else{
            bcrypt.hash(password, null, null, function (err, hash){
                //No funciono la encriptación
                if(err){
                    res
                    .status(500)
                    .send({message: "Error al encriptar la contraseña."});
                } else {
                    user.password = hash;
                    user.save((err, userStore) => {
                        if(err){
                            res.status(500).send({message: "El usuario ya existe."});
                        } else {
                            if (!userStore){
                                res.status(404).send({message: "Error al crear el usuario."});
                            } else {
                                res.status(200).send({user: userStore});
                            }
                        }
                    });
                }
            })
        }
    }
}


module.exports = { signUp };