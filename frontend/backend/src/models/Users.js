const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    names: { type: String, required: true },
    surnames: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    date: { type: Date, default: Date.now}
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

//comparar contraseñas
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

/*userSchema.virtual('role')
    .get(function() {
        if(this.email == 'maxxxy.01@gmail.com') {
            return true;
        }
        return false;
    })*/

module.exports = model('User', userSchema);