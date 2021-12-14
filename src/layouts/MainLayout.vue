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
          <div>Bloque 7</div>
          <div style="font-size: x-small;font-weight: bold;">{{ nombreusuario }}</div>
        </q-toolbar-title>
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
                      <td style="border-bottom: 1px dashed #757575;width: 50px">
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
                    <tr v-for="row in serverData" :key="row.id" style="font-size: smaller;">
                      <td style="font-size: x-small;">
                        {{ row.idproducto }}
                      </td>
                      <td style="font-size: x-small;">
                        {{ row.nombreproducto }}
                      </td>
                      <td style="">
                        {{ row.cantidad }}
                      </td>
                      <td>
                        {{ row.precio.toFixed(2) }}
                      </td>
                      <td>
                        {{ row.subtotal }}
                      </td>
                      <td>
                        <q-icon name="delete" color="red" style="font-size:x-large;" @click="deleteItem(row.id)" />
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
            <q-footer class="bg-black text-white">
              <q-toolbar inset style="width: 100%;justify-content: center;">
                  <!-- <div id="idTotalCarrito" style="margin: 0 20px;width: -webkit-fill-available;">
                    Total : ${{ totalcarrito.toFixed(2) }}
                  </div> -->
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
          v-if="hidecxc"
          class="totalItem"
          @click="layoutModalPays = true">
          <div class="circuloTotalItem totalItemRed">
            {{ totalitemscxc }}
          </div>
          <q-icon name="receipt" color="red" style="font-size:xxx-large;" />
        </div>
        <div
          v-if="hidecarrito"
          class="totalItem"
          @click="layoutModal = true">
          <div class="circuloTotalItem totalItemBlack">
            {{ totalitemspedido }}
          </div>
          <q-icon name="shopping_cart" color="dark" style="font-size:xxx-large;" />
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
</template>

<script>

import { defineComponent, ref } from 'vue'
import clientesLib from '../logic/clientes'
import pedidosLib from '../logic/pedidos'
import moment from 'moment'
// import { date } from 'quasar'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      serverData: [],
      serverDataCxc: [],
      nombreusuario: this.$q.localStorage.getItem('nombreusuario'),
      usuario: this.$q.localStorage.getItem('usuario'),
      idusuario: this.$q.localStorage.getItem('idusuario'),
      idsucursal: this.$q.localStorage.getItem('idsucursal')
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const hidecarrito = ref(false)
    const hidecxc = ref(false)
    const layoutModal = ref(false)
    const layoutModalPays = ref(false)
    const idhold = ref(false)
    return {
      leftDrawerOpen,
      totalcarrito: 0,
      totalitemspedido: 0,
      totalitemscxc: 0,
      hidecarrito,
      totalcxc: 0,
      hidecxc,
      idhold,
      layoutModal,
      layoutModalPays,
      nombrecliente: 'Cliente Público',
      comentario: '',
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
        await pedidosLib.setpedido(this.idusuario, this.usuario, this.idcliente, this.nombrecliente, this.rifcliente, this.totalcarrito, this.idsucursal, this.serverData, this.comentario)
        // console.log(resp.data)
        this.confirmarEnvioPedido()
      })
    },
    calcDiffHours (fecha) {
      const now = moment()
      const end = moment(fecha, 'YYYY-MM-DD')
      console.log(now, end)
      const duration = moment.duration(now.diff(end))
      return duration.asDays().toFixed(0)
    },
    async hideShowCxc (idusuario, idcliente) {
      this.serverDataCxc = []
      this.totalcxc = 0
      const resp = await clientesLib.getcxchold(idusuario, idcliente)
      console.log(resp)
      this.totalitemscxc = resp.data.length
      if (resp.data.length > 0) {
        for (const i in resp.data) {
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
        console.log(this.totalitemscxc, this.totalcxc)
        circuloCxcItem.textContent = this.totalitemscxc
      }
    },
    async hideShowCarrito (idusuario) {
      this.serverData = []
      this.totalcarrito = 0
      const resp = await clientesLib.getholds(idusuario)
      console.log(resp)
      if (resp.data.length > 0) {
        this.hidecarrito = true
        this.hidecxc = true
        this.idcliente = resp.data[0].idcliente
        this.nombrecliente = resp.data[0].nombrecliente
        this.rifcliente = resp.data[0].rifcliente
        this.idhold = resp.data[0].id
        // clientesLib.getcarrito(idcliente)
        const resp2 = await pedidosLib.getitemcarrito(this.idhold)
        console.log(resp2)
        const datos = resp2.data
        this.totalitemspedido = resp2.data.length
        for (const i in datos) {
          const item = datos[i]
          const obj = {}
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
        circuloTotalItem.textContent = this.totalitemspedido
        console.log(this.usuario, this.idcliente)
        this.hideShowCxc(this.usuario, this.idcliente)
      }
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
        this.$router.go(0)
      })
    },
    async deleteCarrito () {
      const resp = await pedidosLib.deletecarrito(this.idhold)
      console.log(resp)
      this.idhold = null
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
    this.hideShowCarrito(this.idusuario)
  }
})
</script>

<style scoped>
  .totalItem{
    display: flex;
    align-items: center;
  }
  .circuloTotalItem{
    width: 30px;
    height: 30px;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -10px;
  }
  .totalItemBlack{
    background: black;
    color: white;
  }
  .totalItemRed{
    background: red;
    color: black;
  }
  .q-toolbar--inset {
    padding-left: 5px;
  }
</style>
