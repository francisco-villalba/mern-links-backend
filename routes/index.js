import express from 'express'
import { addLink, deleteLink, editLink } from '../controllers/links.js'
import { editUser, indexRoute, loginRoute, profileRoute, registerRoute } from '../controllers/user.js'
import { isLoggedIn } from '../middleware/index.js'

const router = express.Router()

router.get('/', isLoggedIn, indexRoute)
router.post('/login', loginRoute)
router.post('/register', registerRoute)
router.get('/:id', profileRoute)
router.put('/user/:id', isLoggedIn, editUser)

router.post('/link', isLoggedIn, addLink)
router.put('/link/:id', isLoggedIn, editLink)
router.delete('/link/:id', isLoggedIn, deleteLink)

export default router