const express = require('express');
const Joi = require('@hapi/joi');
const bodyParser = require('body-parser');
var app = express();

//Global variables declaration
let User = require('../models/users');
User = User.users;
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


const { validateBody } = require('../middlewares/route');

app.post('/users',validateBody(Joi.object().keys({
    firstName: Joi.string().required().description('Users first name'),
    lastName: Joi.string().required().description('Users last name'),
    age: Joi.number().integer().required().description('Users age'),
    profession: Joi.string().default('unemployed'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      let user = new User({
        firstName:req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    profession:req.body.profession
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = app;