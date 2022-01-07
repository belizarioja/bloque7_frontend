import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Pedido {
  setitemcarrito (idhold, idproducto, nombreproducto, precio, cantidad, subtotal, preciocaj, unixcaja, costoactu, porciva, porkilos) {
    const data = { idhold, idproducto, nombreproducto, precio, cantidad, subtotal, preciocaj, unixcaja, costoactu, porciva, porkilos }
    console.log(idhold, idproducto, nombreproducto, precio, cantidad, subtotal, preciocaj, unixcaja, costoactu, porciva, porkilos)
    return axios.post(ENDPOINT_PATH + 'setitemcarrito', data)
  }

  getitemcarrito (idhold) {
    const data = { idhold }
    console.log(idhold)
    return axios.post(ENDPOINT_PATH + 'getitemcarrito', data)
  }

  setitemspedido (idpedido, idproducto, nombreproducto, precio, cantidad, subtotal, preciocaj, unixcaja, costoactu, porciva, porkilos) {
    const data = { idpedido, idproducto, nombreproducto, precio, cantidad, subtotal, preciocaj, unixcaja, costoactu, porciva, porkilos }
    console.log(idpedido, idproducto, nombreproducto, precio, cantidad, subtotal, preciocaj, unixcaja, costoactu, porciva, porkilos)

    return axios.post(ENDPOINT_PATH + 'setitemspedido', data)
  }

  setpedido (idusuario, usuario, idcliente, nombrecliente, rifcliente, total, idsucursal, itemsPedido, comentario) {
    const data = { idusuario, usuario, idcliente, nombrecliente, rifcliente, total, idsucursal, itemsPedido, comentario }
    return axios.post(ENDPOINT_PATH + 'setpedido', data)
  }

  deleteitemcarrito (id) {
    const data = { id }
    return axios.post(ENDPOINT_PATH + 'deleteitemcarrito', data)
  }

  deletecarrito (idhold) {
    const data = { idhold }
    return axios.post(ENDPOINT_PATH + 'deletecarrito', data)
  }

  reportePedidos (usuario, fecha) {
    const data = { usuario, fecha }
    return axios.post(ENDPOINT_PATH + 'reportePedidos', data)
  }

  getSaves (usuario) {
    const data = { usuario }
    return axios.post(ENDPOINT_PATH + 'getSaves', data)
  }

  savePedido (idhold) {
    const data = { idhold }
    return axios.post(ENDPOINT_PATH + 'savePedido', data)
  }

  checkoutSave (idhold, idusuario) {
    const data = { idhold, idusuario }
    return axios.post(ENDPOINT_PATH + 'checkoutSave', data)
  }
}
export default new Pedido()
