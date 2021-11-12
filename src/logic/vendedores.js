import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Vendedor {
  listarVendedores () {
    return axios.get(ENDPOINT_PATH + 'listarVendedores')
  }
}
export default new Vendedor()
