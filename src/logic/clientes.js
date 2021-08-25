import axios from 'axios'
// const ENDPOINT_PATH = 'http://ejdevelop.com/bloque7_backend/'
const ENDPOINT_PATH = 'http://localhost:4001/'
class Cliente {
  listar () {
    return axios.get(ENDPOINT_PATH + 'listar')
  }

  setupcarrito (idusuario, idcliente, nombrecliente) {
    const data = { idusuario, idcliente, nombrecliente }
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
