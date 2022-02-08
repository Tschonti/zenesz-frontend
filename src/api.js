import axios from 'axios'

export const db = axios.create({
    baseURL: 'https://zenesz-api.herokuapp.com/'
})

export const dicsiDb = axios.create({
    baseURL: 'https://dicsi-api.herokuapp.com/'
})