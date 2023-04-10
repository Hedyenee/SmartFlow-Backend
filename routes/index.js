const express = require("express")
const router = express.Router()
const app = express();

// Routes
const { register, login } = require('./authRoute');
const { getAllUsers, getUser, delUser , updatepassword , getAlldevs , getAllClients ,updateuser ,getAllMangers} = require('./userRoute')
const { updateClaim , getClaim, getAllClaim, addClaim, updateStatusClaim, delClaim} = require('./claimRoute')
const { getAllTasks, createTask } = require('./taskRoute')

// middleware
app.use(express.json())


app.use('/auth', router)
app.use('/', router)

router.get('/', (req, res) => res.send('index'))

/* Authentication */
router.post('/register', register)
router.post('/login', login)


/* User */
router.get('/users', getAllUsers)
router.get('/users/:id', getUser)
router.get('/devs', getAlldevs)
router.get('/clients', getAllClients)
router.get('/getmangers', getAllMangers)
router.delete('/users/:id', delUser)
router.put('/users/updatepassword/:id', updatepassword)
router.put('/updateuser/:id',updateuser)


/* Claim */
router.post('/claims', addClaim)
router.get('/claims/:id', getClaim)
router.get('/claims', getAllClaim)
router.put('/claims/:id', updateStatusClaim)
router.put('/claim/:id', updateClaim)
router.delete('/claims/:id', delClaim)


/* Task */
router.post('/tasks', createTask)
router.get('/tasks', getAllTasks)


module.exports = router