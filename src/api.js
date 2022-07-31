import axios from "axios";

const mainAPI = axios.create({
    baseURL: 'https://zwt-api.herokuapp.com/'
})

export {
    mainAPI
}