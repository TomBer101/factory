const usersService = require('../services/usersService')

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers()
        res.status(200).json({users})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


module.exports = {
    getAllUsers,
}