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
  },
  agregarClienteVendedor (idvendedor, nombrevendedor, idcliente, nombrecliente, rifcliente) {
    const data = { idvendedor, nombrevendedor, idcliente, nombrecliente, rifcliente }
    return axios.post(ENDPOINT_PATH + 'agregarClienteVendedor', data)
  },
  eliminarClienteVendedor (id) {
    const data = { id }
    return axios.post(ENDPOINT_PATH + 'eliminarClienteVendedor', data)
  },
  hideShowVendedores (val, id, nombre) {
    const data = { val, id, nombre }
    return axios.post(ENDPOINT_PATH + 'hideShowVendedores', data)
  }
}
