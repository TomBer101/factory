const authService = require('../services/authService')
const usersService = require('../services/usersService');

const login = async (req, res) => {
    try {
        const {userName, email} = req.body
        const token = await authService.login(userName,email)
        res.json({token})
    } catch (err) {
        console.log('Error login: ', err);
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    login
}