const Joi = require('joi');

exports.userValidation = async (req, res, next) =>{
    let schema = Joi.object({
        name: Joi.string().pattern(/^[A-Z][a-z]$/).min(3).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required(),
    })

    validated = await schema.validate(req.body);
    if(validated.error){
        err_message = validated.error.details[0].message.split(" ")[0]
        if(err_message === `"name"`){
            res.status(400).send({status_code: 400, message: "Name should have first letter capital, minimum 3 letters and max 16 letters"});
        }else{
            res.status(400).send({status_code: 400, message: validated.error.details[0].message});
        }
    }else{
        req.validated = true;
        next()
    }
}

exports.movieValidation = async (req, res, next) =>{ 
    let schema = Joi.object({
        name: Joi.string().required(),
        releasDate: Joi.date().required(),
        genre: Joi.string().required(),
        avalCD: Joi.number().required()
    })

    let validated = await schema.validate(req.body);
    if(validated.error){
        res.status(400).send({status_code: 400, message: validated.error.details[0].message});
    }else{
        req.validated = true;
        next()
    }
}
