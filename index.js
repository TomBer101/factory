const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config();

const configDb = require('./mongoDB/config')

const authRoutes = require('./routes/authRouter')
const employeesRout = require('./routes/employeesRouter');
const departmentsRoute = require('./routes/departmentRouter');

const PORT = 8000;
const app = express();
configDb.connectDB().then(() => console.log('Connecte to Mongo DB')).catch(() =>  console.error('Faild login to mongo db'))

app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/users', employeesRout)
app.use('/api/departments', departmentsRoute)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})