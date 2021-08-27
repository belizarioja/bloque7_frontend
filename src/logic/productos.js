import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Producto {
  listar (categoria) {
    const data = { categoria }
    return axios.post(ENDPOINT_PATH + 'listarproductos', data)
  }
}
export default new Producto()
