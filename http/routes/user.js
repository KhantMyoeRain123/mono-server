const Joi = require("joi");
const express = require("express");
const router = express.Router();

const userIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

router.get("/:id/rooms", (req, res) => {
  const { error, value } = userIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  res.status(200).send(`Returning rooms for user with id: ${value.id}`);
});
module.exports = router;
