import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Categoria {
  listar () {
    return axios.get(ENDPOINT_PATH + 'listarcategorias')
  }
}
export default new Categoria()
