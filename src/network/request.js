import axios from 'axios'
axios.defaults.baseURL = '/api'
export default function(config) {
    return axios(config)
}