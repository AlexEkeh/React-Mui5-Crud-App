import axios from 'axios';

// const url = 'http://localhost:5000/users';
const url = "https://react-mui5-crud-app.herokuapp.com/users/"

const addUser = async (data) => {
    try {
        return await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.info(`Error calling API:`, error.message)
    }
}

const getUsers = async () => {
    try {
        return await axios.get(url)
    } catch (error) {
        console.info(`Error calling getUsersAPI:`, error.message)
    }
}

const getUser = async (id) => {
    try {
        return await axios.get(`${url}/${id}`)
    } catch (error) {
        console.info(`Error calling getUser API:`, error.message)
    }
}

const editUser = async (id, data) => {
    try {
        return await axios.put(`${url}/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.info(`Error calling editUser API:`, error.message)
    }
}


const deleteUser = async (id) => {
    try {
        return await axios.delete(`${url}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.info(`Error calling deleteUser API:`, error.message)
    }
}


export {
    addUser,
    getUsers,
    getUser,
    editUser,
    deleteUser
}