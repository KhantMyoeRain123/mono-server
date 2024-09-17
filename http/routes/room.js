const Joi = require("joi");
const express = require("express");
const router = express.Router();

const roomIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

router.get("/:id", (req, res) => {
  const { error, value } = roomIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  res.status(200).send(`Returning room with id: ${value.id}`);
});
module.exports = router;
