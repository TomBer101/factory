const axios = require('axios');

const usersUrl = "https://jsonplaceholder.typicode.com/users";

const getUserByUserName =  (userName) => {
    const data =  axios.get(`${usersUrl}/1`)
    return data;
    
}


const getAllUsers = () => {return axios.get(usersUrl);
}    

module.exports = {
    getUserByUserName, getAllUsers
}