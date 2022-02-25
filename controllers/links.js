import Link from "../models/link.js"

export const addLink = async (req, res) => {
    try {
        if(req.userId) {
            const {title, href } = req.body
            const link = await Link.create({title, href, author: req.userId })
            return res.status(201).json(link)
        }
        res.status(401).json({ error: 'Not logged in' })
    } catch (error) {
        res.status(505).json({ error: 'Something went wrong' })
    }
}

export const editLink = async (req, res) => {
    try {
        const { title, href, author } = req.body
        let data, status

        if(!req.userId) {
            data = { error: 'Not logged in' }
            status = 404
        } else if(req.userId !== author) {
            data = { error: 'You don\'t own this link' }
            status = 401
        } else {
            await Link.findByIdAndUpdate(req.params.id, { title, href })
            const links = await Link.find({ author })
            
            data = links
            status = 201
        }

        res.status(status).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

export const deleteLink = async (req, res) => {
    try {
        const { author } = req.body
        let data, status

        if(!req.userId) {
            data = { error: 'Not logged in' }
            status = 404
        } else if(req.userId !== author) {
            data = { error: 'You don\'t own this link' }
            status = 401
        } else {
            await Link.findByIdAndDelete(req.params.id)
            
            data = { message: 'Ok'}
            status = 201
        }

        res.status(status).json(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Something went wrong' })
    }
} 