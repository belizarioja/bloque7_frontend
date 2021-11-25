import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

export default {
  login (usuario, clave) {
    const data = { usuario, clave }
    return axios.post(ENDPOINT_PATH + 'login', data)
  },
  usuarios () {
    return axios.get(ENDPOINT_PATH + 'usuarios')
  },
  hideShowUsuarios (val, id) {
    const data = { val, id }
    return axios.post(ENDPOINT_PATH + 'hideShowUsuarios', data)
  }
}
