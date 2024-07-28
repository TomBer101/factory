const JSFile = require('jsonfile')
const path = require('path')
const fs = require('fs')

const logFilePath = path.join(__dirname, 'actions_log.json')

if(!fs.existsSync(logFilePath)) {
    JSFile.writeFileSync(logFilePath, [])
}

const logAction = (userId, maxActions, actionAllowd) => {

    const logEntry = {
        id: userId,
        maxActions,
        actionAllowd,
        date: new Date().toLocaleString().split(',')[0]
    };

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err && err.code != 'ENOENT') {
            return console.error('Error reading log file: ', err)
        }

        let logData = { actions: [] };
        if (!err) {
            try {
                logData = JSON.parse(data)
            } catch (parseErr) {
                return console.error('Error parsing log file: ', parseErr)
            }
        }

        logData.actions.push(logEntry)

         fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), (writeErr) => {
            if (writeErr) {
                return console.error('Error writing to log file: ', writeErr)
            }
         })

    })



}

const loggerMiddlware = (req, res, next) => {
    const originalSend = res.send

    res.send = function (body) {
        const userId = req.user.userId;
        const maxActions =  req.maxActions;
        const currentActions = req.currentActions;

        logAction(userId, maxActions,currentActions);
        return originalSend.apply(this, arguments)

    }

    next()
}

module.exports = loggerMiddlware

