import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Cliente {
  /* listar () {
    return axios.get(ENDPOINT_PATH + 'listar')
  } */

  /* setupcarrito (idusuario, idcliente, nombrecliente, rifcliente) {
    const data = { idusuario, idcliente, nombrecliente, rifcliente }
    console.log(idusuario, idcliente, nombrecliente, rifcliente)
    return axios.post(ENDPOINT_PATH + 'setupcarrito', data)
  } */

  /* getcarrito (idusuario) {
    const data = { idusuario }
    return axios.post(ENDPOINT_PATH + 'getcarrito', data)
  } */

  getholds (idusuario) {
    const data = { idusuario }
    return axios.post(ENDPOINT_PATH + 'getholds', data)
  }

  getitemsholds (idusuario) {
    const data = { idusuario }
    return axios.post(ENDPOINT_PATH + 'getitemsholds', data)
  }

  /* getcxchold (idusuario, idcliente) {
    const data = { idusuario, idcliente }
    return axios.post(ENDPOINT_PATH + 'getcxchold', data)
  } */

  getcxc (idusuario, idrol) {
    const data = { idusuario, idrol }
    return axios.post(ENDPOINT_PATH + 'getcxc', data)
  }
}
export default new Cliente()
