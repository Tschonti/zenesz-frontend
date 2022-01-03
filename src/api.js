import axios from 'axios'

export const db = axios.create({
    baseURL: 'https://zenesz-api.herokuapp.com/'
})