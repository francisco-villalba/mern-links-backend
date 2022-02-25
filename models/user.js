import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    nickname: String,
    theme: {
        type: String,
        default: 'blue triangles'
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
})

const User = mongoose.model('User', userSchema)

export default User