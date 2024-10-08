const User = require('../models/userModel');
const dateUtils = require('../utils/dateUtils');

const actionMiddleware = async (req, res, next) => {
    const user = req.user;

    try {
        const userEntity = await User.findOne({externalId: user.userId});
        if(!userEntity) {
            return res.status(300).json({message: 'User does not wxists!'})
        }

        if (userEntity.numOfActions === userEntity.currentActionsAmount) {
            if (!dateUtils.has24HoursPassed(userEntity.lastLogin, Date.now())) {
                return res.status(403).json({message: 'You have reached your limit of actions. Wait :)'})
            } else {
                userEntity.currentActionsAmount = 1;
            }
        } else {
            userEntity.currentActionsAmount += 1;
        }

        await userEntity.save();
        req.maxActions = userEntity.numOfActions;
        req.currentActionsAmount = userEntity.currentActionsAmount
        next()
    } catch (err) {
        console.error(`There was an error in action middlware for user ${user.userName}: `, err)
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = actionMiddleware