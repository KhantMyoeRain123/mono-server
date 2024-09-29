const Joi = require("joi");
const roomIdSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});


module.exports=roomIdSchema;