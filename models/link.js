import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    title: String,
    href: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    }
})

const Link = mongoose.model('Link', linkSchema)

export default Link