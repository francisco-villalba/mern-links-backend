import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if(token) {
            const data = jwt.verify(token, process.env.SECRET)
            req.userId = data.id   
        }

        next()
    } catch (error) {   
        res.status(500).json({ error: 'Something went wrong' })
    }
}