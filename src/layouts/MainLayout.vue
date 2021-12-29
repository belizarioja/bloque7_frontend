<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary text-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div style="font-size: 12px;font-weight: bold;">Bloque 7 - V{{ VERSION }}</div>
          <div style="font-size: 14px;font-weight: bold;">{{ nombreusuario }}</div>
        </q-toolbar-title>
        <!-- PEDIDOS GUARDADOS SIN ENVIAR DEL VENDEDOR -->
        <q-dialog v-model="layoutModalSaves">
          <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title style="font-size: inherit;display: grid;">
                  <span style=""> Pedidos guardados sin enviar </span>
                </q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-page padding>
                <div>
                  <table style="width: -webkit-fill-available;">
                    <tr style="font-size: 9px;">
                      <td style="border-bottom: 1px dashed #757575;">
                        #
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Fecha
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Cliente
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Items
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Subtotal
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Acciones
                      </td>
                    </tr>
                    <tr v-for="row in serverDataSaves" :key="row.id" style="font-size: 9px;">
                      <td>
                        {{ row.i }}
                      </td>
                      <td>
                        {{ row.fecha }}
                      </td>
                      <td>
                        {{ row.idcliente }} {{ row.nombrecliente }}
                      </td>
                      <td>
                        {{ row.cantidad }}
                      </td>
                      <td>
                        {{ row.subtotal.toFixed(2) }}
                      </td>
                      <td style="display: flex;">
                        <q-icon name="add_shopping_cart" color="primary" style="font-size:20px;" />
                        <q-icon name="delete" color="red" style="font-size:20px;" />
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
            <q-footer class="bg-black text-white">
              <q-toolbar inset style="width: 100%;justify-content: center;">
                  <div id="idTotalSaves" style="margin: 0 20px;width: -webkit-fill-available;">
                    Total : {{ totalsaves.toFixed(2) }}
                  </div>
              </q-toolbar>
            </q-footer>
          </q-layout>
        </q-dialog>
        <!-- CUENTA POR COBRAR DEL CLIENTE -->
        <q-dialog v-model="layoutModalPays">
          <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title style="font-size: inherit;display: grid;">
                  <span style=""> Deuda pendiente de: </span>
                  <span style="">{{ nombrecliente }}</span>
                </q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-page padding>
                <div>
                  <table style="width: -webkit-fill-available;">
                    <tr>
                      <td style="border-bottom: 1px dashed #757575;">
                        # Control
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Fecha
                      </td>
                      <td style="border-bottom: 1px dashed #757575;text-align: center;color: red;">
                        Dias
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Monto
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Saldo
                      </td>
                    </tr>
                    <tr v-for="row in serverDataCxc" :key="row.id" style="font-size: smaller;">
                      <td>
                        {{ row.id }}
                      </td>
                      <td>
                        {{ row.fecha }}
                      </td>
                      <td style="text-align: center;color: red;">
                        {{ row.dias }}
                      </td>
                      <td>
                        {{ row.monto.toFixed(2) }}
                      </td>
                      <td>
                        {{ row.saldo.toFixed(2) }}
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
            <q-footer class="bg-black text-white">
              <q-toolbar inset style="width: 100%;justify-content: center;">
                  <div id="idTotalCxc" style="margin: 0 20px;width: -webkit-fill-available;">
                    Total : {{ totalcxc.toFixed(2) }}
                  </div>
              </q-toolbar>
            </q-footer>
          </q-layout>
        </q-dialog>
        <!-- CARRITO DE COMPRA PEDIDO DEL CLIENTE -->
        <q-dialog v-model="layoutModal">
          <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title style="font-size: inherit;display: grid;">
                  <span style=""> Detalle del pedido de: </span>
                  <span style="">{{ nombrecliente }}</span>
                </q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-page padding>
                <div>
                  <table style="width: -webkit-fill-available;">
                    <tr style="font-size: x-small;">
                      <td style="border-bottom: 1px dashed #757575;">
                        #
                      </td>
                      <td style="border-bottom: 1px dashed #757575;width: 50px;">
                        Código
                      </td>
                      <td style="border-bottom: 1px dashed #757575;width: 111px;">
                        Producto
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Cant
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Precio
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Subtotal
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Editar
                      </td>
                    </tr>
                    <tr
                      v-for="row in serverData"
                      :key="row.id"
                      :class="{'otropedido' : row.i > 13 }"
                      style="font-size: smaller;"
                    >
                      <td :class="{'bordeotropedido' : row.i === 14 }" style="font-size: x-small;">
                        {{ row.i }}
                      </td>
                      <td :class="{'bordeotropedido' : row.i === 14 }" style="font-size: x-small;">
                        {{ row.idproducto }}
                      </td>
                      <td :class="{'bordeotropedido' : row.i === 14 }" style="font-size: x-small;">
                        {{ row.nombreproducto }}
                      </td>
                      <td :class="{'bordeotropedido' : row.i === 14 }">
                        {{ row.cantidad }}
                      </td>
                      <td :class="{'bordeotropedido' : row.i === 14 }">
                        {{ row.precio.toFixed(2) }}
                      </td>
                      <td :class="{'bordeotropedido' : row.i === 14 }">
                        {{ row.subtotal }}
                      </td>
                      <td :class="{'bordeotropedido' : row.i === 14 }">
                        <q-icon name="delete" color="red" style="font-size:x-large;" @click="deleteItem(row.id)" />
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
            <q-footer class="bg-black text-white">
              <q-toolbar inset style="width: 100%;justify-content: center;">
                  <q-btn
                    style="font-size: x-small;margin-right: 20px;"
                    label="Enviar Pedido"
                    type="buttom"
                    color="primary"
                    @click="createPedido()"
                  />
                  <q-btn
                    style="font-size: x-small;"
                    label="Cancelar Pedido"
                    type="buttom"
                    color="negative"
                    @click="deletePedido()"
                  />
              </q-toolbar>
            </q-footer>
          </q-layout>
        </q-dialog>
        <div
          class="totalItem totalItemSaves"
          @click="hideShowSaves(idusuario); layoutModalSaves = !layoutModalSaves">
          <div class="circuloTotalItem totalItemBlue">
            {{ totalitemscxc }}
          </div>
          <q-icon name="point_of_sale" color="primary" style="font-size:35px;" />
        </div>
        <div
          class="totalItem invisible totalItemCxc"
          @click="hideShowCxc(usuario)">
          <div class="circuloTotalItem totalItemRed">
            {{ totalitemscxc }}
          </div>
          <q-icon name="receipt" color="red" style="font-size:35px;" />
        </div>
        <div
          class="totalItem invisible totalItemHold"
          @click="hideShowCarrito(idusuario)">
          <div class="circuloTotalItem totalItemBlack">
            {{ totalitemspedido }}
          </div>
          <q-icon name="shopping_cart" color="dark" style="font-size:35px;" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list padding>
        <q-item style="display: flex; align-items: center; justify-content: center;">
          <img src="../assets/logobloque7.png" height="140"/>
        </q-item>
      </q-list>
      <q-list padding>
        <q-item
          to="/index"
          exact
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            Principal
          </q-item-section>
        </q-item>
        <q-item
          to="/clientes"
          exact
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="point_of_sale" />
          </q-item-section>
          <q-item-section>
            Realizar pedido
          </q-item-section>
        </q-item>
        <q-item
          to="/cuentasxcobrar"
          exact
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="paid" />
          </q-item-section>
          <q-item-section>
            Cuentas por cobrar
          </q-item-section>
        </q-item>
        <q-item
          v-show="idrol > 1"
          to="/reportepedidos"
          exact
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="view_list" />
          </q-item-section>
          <q-item-section>
            Reporte de pedidos
          </q-item-section>
        </q-item>
        <q-item
          v-show="idrol === 1"
          to="/vendedores"
          exact
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="manage_accounts" />
          </q-item-section>
          <q-item-section>
            Vendedores
          </q-item-section>
        </q-item>
        <q-item
          to="/cambiarclave"
          exact
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="lock_clock" />
          </q-item-section>
          <q-item-section>
            Cambiar clave
          </q-item-section>
        </q-item>
        <q-item
          to="/ayuda"
          active
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section>
            Ayuda
          </q-item-section>
        </q-item>
        <q-item
          to="/logout"
          active
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            Salir
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <div v-if="loader" class="procesando">
    <span style="display:grid;">Enviando pedido...
    <q-linear-progress indeterminate />
    </span>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import clientesLib from '../logic/clientes'
import pedidosLib from '../logic/pedidos'
import moment from 'moment'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      serverData: [],
      serverDataCxc: [],
      serverDataSaves: [],
      loader: false,
      nombreusuario: this.$q.localStorage.getItem('nombreusuario'),
      usuario: this.$q.localStorage.getItem('usuario'),
      idusuario: this.$q.localStorage.getItem('idusuario'),
      idsucursal: this.$q.localStorage.getItem('idsucursal'),
      idrol: this.$q.localStorage.getItem('idrol')
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    // const hidecarrito = ref(false)
    // const hidecxc = ref(false)
    const layoutModal = ref(false)
    const layoutModalPays = ref(false)
    const layoutModalSaves = ref(false)
    const idhold = ref(false)
    const VERSION = config.version
    return {
      leftDrawerOpen,
      totalcarrito: 0,
      totalitemspedido: 0,
      totalitemscxc: 0,
      // hidecarrito,
      totalcxc: 0,
      totalsaves: 0,
      // hidecxc,
      idhold,
      layoutModal,
      layoutModalPays,
      layoutModalSaves,
      nombrecliente: 'Cliente Público',
      comentario: '',
      VERSION,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    createPedido () {
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Esta seguro de enviar este PEDIDO?',
        ok: {
          color: 'primary',
          label: 'Sí'
        },
        cancel: {
          color: 'secondary',
          label: 'No'
        },
        persistent: true
      }).onOk(async () => {
        const arregloOriginal = this.serverData
        const arregloDeArreglos = []
        // console.log('Arreglo original: ', arregloOriginal)
        const LONGITUD_PEDAZOS = 13
        for (let i = 0; i < arregloOriginal.length; i += LONGITUD_PEDAZOS) {
          const pedazo = arregloOriginal.slice(i, i + LONGITUD_PEDAZOS)
          arregloDeArreglos.push(pedazo)
        }
        // console.log('Arreglo de arreglos: ', arregloDeArreglos)
        this.loader = true
        for (const i in arregloDeArreglos) {
          const arreglopedido = arregloDeArreglos[i]
          // console.log(arreglopedido)
          await pedidosLib.setpedido(this.idusuario, this.usuario, this.idcliente, this.nombrecliente, this.rifcliente, this.totalcarrito, this.idsucursal, arreglopedido, this.comentario)
        }
        this.loader = false
        this.confirmarEnvioPedido()
      })
    },
    calcDiffHours (fecha) {
      const now = moment()
      const end = moment(fecha, 'YYYY-MM-DD')
      // console.log(now, end)
      const duration = moment.duration(now.diff(end))
      return duration.asDays().toFixed(0)
    },
    async hideShowCxc (usuario) {
      const idcliente = this.$q.localStorage.getItem('idcliente')
      this.serverDataCxc = []
      this.totalcxc = 0
      this.layoutModalPays = true
      console.log(usuario, idcliente)
      const resp = await clientesLib.getcxchold(usuario, idcliente)
      console.log(resp)
      this.totalitemscxc = resp.data.length
      if (resp.data.length > 0) {
        for (const i in resp.data) {
          // this.hidecxc = true
          const item = resp.data[i]
          const obj2 = {}
          obj2.id = item.id
          obj2.fecha = moment(item.fecha).format('YYYY-MM-DD')
          obj2.dias = this.calcDiffHours(item.fecha)
          obj2.monto = item.monto
          obj2.saldo = item.saldo
          this.totalcxc += parseFloat(obj2.saldo)
          this.serverDataCxc.push(obj2)
        }
        const idTotalCxc = document.querySelector('#idTotalCxc')
        const circuloCxcItem = document.querySelector('.totalItemRed')
        if (idTotalCxc) {
          idTotalCxc.textContent = 'Total : $' + this.totalcxc.toFixed(2)
        }
        circuloCxcItem.textContent = this.totalitemscxc
      }
      // else {
      //  this.hidecxc = false
      // }
    },
    async hideShowCarrito (idusuario) {
      this.serverData = []
      this.totalcarrito = 0
      this.layoutModal = true
      const resp = await clientesLib.getholds(idusuario)
      // console.log(resp)
      if (resp.data.length > 0) {
        // this.hidecarrito = true
        // this.hidecxc = true
        // this.idcliente = resp.data[0].idcliente
        this.nombrecliente = resp.data[0].nombrecliente
        this.rifcliente = resp.data[0].rifcliente
        this.idhold = resp.data[0].id
        // clientesLib.getcarrito(idcliente)
        const resp2 = await pedidosLib.getitemcarrito(this.idhold)
        // console.log(resp2)
        const datos = resp2.data
        this.totalitemspedido = resp2.data.length
        for (const i in datos) {
          const item = datos[i]
          const obj = {}
          obj.i = parseInt(i) + 1
          obj.id = item.id
          obj.idproducto = item.idproducto
          obj.nombreproducto = item.nombreproducto
          obj.precio = item.precio
          obj.cantidad = item.cantidad
          obj.subtotal = item.subtotal.toFixed(2)
          obj.preciocaj = item.preciocaj
          obj.unixcaja = item.unixcaja
          obj.costoactu = item.costoactu
          obj.porciva = item.porciva
          obj.porkilos = item.porkilos
          this.totalcarrito += parseFloat(obj.subtotal)
          this.serverData.push(obj)
        }
        const idTotalCarrito = document.querySelector('#idTotalCarrito')
        const circuloTotalItem = document.querySelector('.totalItemBlack')
        if (idTotalCarrito) {
          idTotalCarrito.textContent = 'Total : $' + this.totalcarrito.toFixed(2)
        }
        if (circuloTotalItem) {
          circuloTotalItem.textContent = this.totalitemspedido
        }
        // console.log(this.usuario, this.idcliente)
        // this.hideShowCxc(this.usuario, this.idcliente)
      }
    },
    async hideShowSaves (idusuario) {
      this.serverDataSaves = []
      this.totalsaves = 0
      const resp = await pedidosLib.getSaves(idusuario)
      console.log(resp)
      const datos = resp.data
      this.totalitemsaves = resp.data.length
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.i = parseInt(i) + 1
        obj.id = item.id
        obj.fecha = moment(item.fecha).format('YYYY-MM-DD')
        obj.idcliente = item.idcliente
        obj.nombrecliente = item.nombrecliente
        obj.cantidad = item.cantidad
        obj.subtotal = item.subtotal
        this.totalsaves += parseFloat(obj.subtotal)
        this.serverDataSaves.push(obj)
      }
      const idTotalSaves = document.querySelector('#idTotalSaves')
      const circuloTotalSaves = document.querySelector('.totalItemBlue')
      if (idTotalSaves) {
        idTotalSaves.textContent = 'Total : $' + this.totalsaves.toFixed(2)
      }
      if (circuloTotalSaves) {
        circuloTotalSaves.textContent = this.totalitemsaves
      }
      console.log(this.serverDataSaves)
    },
    deletePedido () {
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Seguro que sea ELIMINAR este PEDIDO?',
        ok: {
          color: 'primary',
          label: 'Sí'
        },
        cancel: {
          color: 'secondary',
          label: 'No'
        },
        persistent: true
      }).onOk(async () => {
        await this.deleteCarrito()
        // this.$router.go(0)
      })
    },
    async deleteCarrito () {
      await pedidosLib.deletecarrito(this.idhold)
      this.layoutModal = false
      this.idhold = null
      const totalItemCxc = document.querySelector('.totalItemCxc')
      totalItemCxc.classList.add('invisible')

      const circuloCxcItem = document.querySelector('.totalItemRed')
      circuloCxcItem.textContent = 0

      const totalItemHold = document.querySelector('.totalItemHold')
      totalItemHold.classList.add('invisible')

      const circuloTotalItem = document.querySelector('.totalItemBlack')
      circuloTotalItem.textContent = 0

      this.$q.localStorage.remove('idcliente')
    },
    confirmarEnvioPedido () {
      this.layoutModal = false
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Pedido realizado y enviado con éxito!',
        ok: {
          color: 'primary',
          label: 'Aceptar'
        },
        persistent: true
      }).onOk(() => {
        this.deleteCarrito()
        this.$router.go(0)
      })
    },
    deleteItem (id) {
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Desea eliminar este item al pedido?' + id,
        ok: {
          color: 'primary',
          label: 'Sí'
        },
        cancel: {
          color: 'secondary',
          label: 'No'
        },
        persistent: true
      }).onOk(() => {
        pedidosLib.deleteitemcarrito(id)
        this.hideShowCarrito(this.idusuario)
      })
    }
  },
  mounted () {
    console.log('Main Layout')
    this.hideShowSaves(this.idusuario)
  },
  created () {
    const verificarServidor = setInterval(() => {
      const cadena = ENDPOINT_PATH
      const request = new XMLHttpRequest()
      try {
        request.open('GET', cadena, false)
        // TE FALTA
        request.send()
      } catch (error) {
        console.log(console.log(cadena + ' CAIDO'))
        clearInterval(verificarServidor)
        this.$q.dialog({
          title: 'Oops! Problemas con INTERNET',
          message: 'Revise conexión e intente ingresar de nuevo!',
          persistent: true
        }).onOk(() => {
          this.$router.push('/logout')
        })
      }
    }, (1000 * 2))
  }
})
</script>

<style scoped>
  .invisible{
    display: none;
  }
  .totalItem{
    display: flex;
    align-items: center;
  }
  .circuloTotalItem{
    width: 25px;
    height: 25px;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -7px;
  }
  .totalItemBlack{
    background: black;
    color: white;
  }
  .totalItemRed{
    background: red;
    color: black;
  }
  .totalItemBlue{
    background: #1976D2;
    color: white;
  }
  .q-toolbar--inset {
    padding-left: 5px;
  }
  .otropedido {
    color: cornflowerblue
  }
  .bordeotropedido {
    border-top: 1px dashed #757575;
  }
  .procesando {
    background: #3a4142cc;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99999;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 29px;
    color: white;
  }
</style>
