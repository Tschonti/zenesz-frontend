import axios from 'axios'

export const db = axios.create({
    baseURL: 'https://api.zenesz.okgy.hu/'
})

export const dicsiDb = axios.create({
    baseURL: 'https://api.dicsi.okgy.hu/'
})