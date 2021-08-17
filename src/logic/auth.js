import axios from 'axios'
const ENDPOINT_PATH = 'http://ejdevelop.com/bloque7_backend/'
// const ENDPOINT_PATH = 'http://localhost:4001/'
export default {
  login (usuario, clave) {
    const data = { usuario, clave }
    return axios.post(ENDPOINT_PATH + 'login', data)
  }
}
