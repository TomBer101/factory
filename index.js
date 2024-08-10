const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config();

const configDb = require('./mongoDB/config')

const authRoutes = require('./routes/authRouter')
const employeesRout = require('./routes/employeesRouter');
const departmentsRoute = require('./routes/departmentRouter');
const shiftsRouter = require('./routes/shiftsRoter')
const usersRouter = require('./routes/usersRoutes')

const PORT = 8000;
const app = express();
configDb.connectDB().then(() => console.log('Connecte to Mongo DB')).catch(() =>  console.error('Faild login to mongo db'))

app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRout)
app.use('/api/departments', departmentsRoute)
app.use('/api/shifts', shiftsRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})