const express = require('express')
const app = express()
require('dotenv').config();
require('./Models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const TaskRouter = require('./Routes/TaskRouter');
const ensureAuthenticated = require('./Middlewares/Auth');
const VerificationRouter = require('./Routes/VerificationRouter');

const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    res.send('Hello World!')
})

app.use(bodyParser.json());
app.use(cors()); //for request from different ports (example frontend will send req from diffrent port than that of backend)
app.use('/auth', AuthRouter)
app.use('/task',ensureAuthenticated, TaskRouter)
app.use('/verification', ensureAuthenticated, VerificationRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});