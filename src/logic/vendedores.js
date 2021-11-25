import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

export default {
  listarVendedores () {
    return axios.get(ENDPOINT_PATH + 'listarVendedores')
  },
  listarVendedorClientes (idvendedor) {
    const data = { idvendedor }
    return axios.post(ENDPOINT_PATH + 'listarVendedorClientes', data)
  }
}
