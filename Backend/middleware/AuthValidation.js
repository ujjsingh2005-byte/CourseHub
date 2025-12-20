import joi from 'joi';



export const signupValidation = (req,res,next) =>{
   const schema = joi.object({
    Name : joi.string().min(4).max(100).required(),
    EmailId: joi.string()
  .required()
  .messages({
    'string.pattern.base': 'Email must follow format like 02x1xyz215@gmail.com with a valid branch code'
  }),

    Password: joi.string().min(3).max(100).required(),
    Mobile: joi.number().min(10).required(),
    Gender:joi.string().required(),

   });
   const {error} = schema.validate(req.body);
   if(error){
    return res.status(400)
        .json({message :"bad request",error})
   }

   next();
}





export const loginupValidation = (req,res,next) =>{
   const schema = joi.object({
    EmailId: joi.string()
  .required()
  .messages({
    'string.pattern.base': 'Email must follow format like 02x1xyz215@gmail.com with a valid branch code'
  }),

    Password: joi.string().min(3).max(100).required(),
   });
   const {error} = schema.validate(req.body);
   if(error){
    return res.status(400)
        .json({message :"bad request",error})
   }

   next();
}





export const AdminloginupValidation = (req,res,next) =>{
   const schema = joi.object({
   EmailId: joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required(),
    Password: joi.string().min(4).max(15).required(),
   });
   const {error} = schema.validate(req.body);
   if(error){
    return res.status(400)
        .json({message :"bad request",error})
   }
   next();
}



