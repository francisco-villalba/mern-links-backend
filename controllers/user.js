import bcrypt from 'bcrypt'
import User from '../models/user.js'
import Link from '../models/link.js'
import jwt from 'jsonwebtoken'

export const registerRoute = async (req, res) => {
    try {
        const { email, password, nickname, theme} = req.body
        const user = await User.findOne({ email })
        let data
        let status
    
        if(user) {
            data = { error: 'User already taken'}
            status = 404
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await User.create({ email, password: hashedPassword, nickname, theme })
            const token = jwt.sign({ email, id: user._id}, process.env.SECRET, { expiresIn: '60d' })
            
            data = { token }
            status = 201
        }
    
        res.status(status).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

export const loginRoute = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const passwordsMatch = async () => await bcrypt.compare(password, user.password)  
    
        let data
        let status
    
        if(user && await passwordsMatch()) {
            const token = jwt.sign({ email, id: user._id}, process.env.SECRET, { expiresIn: '60d' })
            
            data = { token }
            status = 201
        } else {
            data = { error: 'Invalid email or password' }
            status = 404
        }

        res.status(status).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

export const indexRoute = async (req, res) => {
    try {
        if(req.userId) {
            const user = await User.findById(req.userId)
            const links = await Link.find({ author: req.userId})
            return res.json({ user, links })
        }
    
        res.status(404).json({ error: 'Not logged in' })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong'})
    }
}


export const profileRoute = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const links = await Link.find({ author: req.params.id })
        const data = {
            user: {
                nickname: user.nickname,
                description: user.description,
                theme: user.theme,
                image: user.image
            },
            links
        }

        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

export const editUser = async (req, res) => {
    try {
        let data, status
        
        if(!req.userId) {
            data = { error: 'Not logged in' }
            status = 404
        } else if(req.userId !== req.params.id) {
            data = { error: 'You don\'t own this user' }
            status = 401
        } else {
            await User.findByIdAndUpdate(req.params.id, req.body)
            
            data = 'ok'
            status = 201
        }

        res.status(status).json(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
