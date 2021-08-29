import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

class Pedido {
  setitemcarrito (idhold, idproducto, nombreproducto, precio, cantidad, pieza, subtotal) {
    const data = { idhold, idproducto, nombreproducto, precio, cantidad, pieza, subtotal }
    console.log(idhold, idproducto, nombreproducto, precio, cantidad, pieza, subtotal)
    return axios.post(ENDPOINT_PATH + 'setitemcarrito', data)
  }

  getitemcarrito (idhold) {
    const data = { idhold }
    console.log(idhold)
    return axios.post(ENDPOINT_PATH + 'getitemcarrito', data)
  }
}
export default new Pedido()
