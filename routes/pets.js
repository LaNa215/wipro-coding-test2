const express = require('express');
const Joi = require('@hapi/joi');
const bodyParser = require('body-parser');
var app = express();

//Global variables declaration
let User = require('../models/users');
User = User.pets
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


const { validateBody } = require('../middlewares/route');

app.post('/pets', validateBody(Joi.object().keys({
    name: Joi.string().required().description('name'),
    age: Joi.number().integer().required().description('age'),
    color: Joi.string().required().description('color'),
}),
    {
        stripUnknown: true,
    }), async (req, res, next) => {
        try {
            var data = new User({
                name: req.body.name,
                age: req.body.age,
                color: req.body.color
            });
            await data.save()
            res.status(201).json(data);
        } catch (error) {
            next(error)
        }
    }
)

module.exports = app;

