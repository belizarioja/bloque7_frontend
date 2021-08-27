import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Cliente {
  listar () {
    return axios.get(ENDPOINT_PATH + 'listar')
  }

  setupcarrito (idusuario, idcliente, nombrecliente) {
    const data = { idusuario, idcliente, nombrecliente }
    console.log(idusuario, idcliente, nombrecliente)
    return axios.post(ENDPOINT_PATH + 'setupcarrito', data)
  }

  getcarrito (idusuario) {
    const data = { idusuario }
    return axios.post(ENDPOINT_PATH + 'getcarrito', data)
  }

  getholds (idusuario) {
    const data = { idusuario }
    return axios.post(ENDPOINT_PATH + 'getholds', data)
  }
}
export default new Cliente()
