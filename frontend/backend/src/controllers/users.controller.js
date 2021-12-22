const bcrypt = require('bcrypt')

const usersCtrl = {}

const User = require('../models/Users')

usersCtrl.getUser = async (req, res) => {
    const user = await User.findOne({email: req.params.email})

    res.json(user)
}

usersCtrl.createUser = async (req, res) => {
    const { names, surnames, email, password } = req.body

    const existed = await User.findOne({email: email})

    if(!existed) {
        const newUser = new User({
            names,
            surnames,
            email,
            password
        })
    
        await newUser.save()
        res.json({message: 'Usuario creado'})
    } else {
        res.json({message: 'ERROR'})
    }

    
}

module.exports = usersCtrl