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
          <div>Bloque 7 App</div>
          <div style="font-size: small;">Bienvenido {{ nombreusuario }}</div>
        </q-toolbar-title>
        <q-dialog v-model="layoutModal">
          <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title style="font-size: inherit;">
                  {{ nombrecliente }}
                </q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-page padding>
                <div>
                  <table style="width: -webkit-fill-available;">
                    <tr>
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
                      <td>
                        {{ row.idproducto }}
                      </td>
                      <td style="font-size: x-small;">
                        {{ row.nombreproducto }}
                      </td>
                      <td>
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
            <q-footer class="bg-black text-white" style="height: 112px;">
              <q-toolbar inset style="display: grid;">
                <q-input color="teal" bg-color="white" outlined v-model="comentario" type="text" label="Comentario" style="margin-top: 10px;"/>
                <div style="display: flex;margin-top: 10px;">
                  <div id="idTotalCarrito" style="margin: 0 20px;width: -webkit-fill-available;">
                    Total : ${{ totalcarrito.toFixed(2) }}
                  </div>
                  <q-btn
                    style="width: -webkit-fill-available; font-size: x-small;"
                    label="Enviar Pedido"
                    type="buttom"
                    color="primary"
                    @click="createPedido()"
                  />
                </div>
              </q-toolbar>
            </q-footer>
          </q-layout>
        </q-dialog>
        <div
          v-if="hidecarrito"
          class="totalItem"
          @click="layoutModal = true">
          <div class="circuloTotalItem">
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
            <q-icon name="rule" />
          </q-item-section>
          <q-item-section>
            Principal
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
          to="/"
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

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      serverData: [],
      nombreusuario: this.$q.localStorage.getItem('nombreusuario'),
      usuario: this.$q.localStorage.getItem('usuario'),
      idusuario: this.$q.localStorage.getItem('idusuario'),
      idsucursal: this.$q.localStorage.getItem('idsucursal')
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const hidecarrito = ref(false)
    const layoutModal = ref(false)
    const idhold = ref(false)
    return {
      leftDrawerOpen,
      totalcarrito: 0,
      totalitemspedido: 0,
      hidecarrito,
      idhold,
      layoutModal,
      nombrecliente: 'Cliente Público',
      comentario: '',
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    async createPedido () {
      const resp = await pedidosLib.setpedido(this.idusuario, this.usuario, this.idcliente, this.nombrecliente, this.rifcliente, this.totalcarrito, this.idsucursal, this.serverData, this.comentario)
      console.log(resp.data)
      /* for (const i in this.serverData) {
        const item = this.serverData[i]
        console.log(idpedido, item.idproducto, item.nombreproducto, item.precio, item.cantidad, item.pieza, parseFloat(item.subtotal), this.idsucursal)
        await pedidosLib.setitemspedido(idpedido, idpedidoenc, item.idproducto, item.nombreproducto, item.precio, item.cantidad, item.pieza, parseFloat(item.subtotal), this.idsucursal)
      } */
      // this.deleteCarrito()
      // this.$router.go(0)
    },
    async hideShowCarrito (idcliente) {
      this.serverData = []
      this.totalcarrito = 0
      const resp = await clientesLib.getholds(idcliente)
      console.log(resp)
      if (resp.data.length > 0) {
        this.hidecarrito = true
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
        const circuloTotalItem = document.querySelector('.circuloTotalItem')
        // console.log(this.totalcarrito)
        // console.log(this.totalitemspedido)
        if (idTotalCarrito) {
          idTotalCarrito.textContent = 'Total : $' + this.totalcarrito.toFixed(2)
        }
        circuloTotalItem.textContent = this.totalitemspedido
      }
    },
    async deleteCarrito () {
      const resp = await pedidosLib.deletecarrito(this.idhold)
      console.log(resp)
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Pedido realizado y enviado con éxito!',
        persistent: true
      }).onOk(() => {
        this.$router.go(0)
        // this.$router.push('/categorias')
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
    console.log(this.idusuario)
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
    background: black;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .q-toolbar--inset {
    padding-left: 5px;
  }
</style>
