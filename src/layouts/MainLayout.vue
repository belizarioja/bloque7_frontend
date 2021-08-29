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
          Bloque 7 App
        </q-toolbar-title>
        <q-dialog v-model="layoutModal">
          <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title>
                  {{ nombrecliente }}
                </q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-footer class="bg-black text-white">
              <q-toolbar inset>
                <div style="margin: 0 20px;width: inherit;">
                  Total : $24.50
                </div>
                <q-btn
                  style="width: -webkit-fill-available;"
                  label="Enviar Pedido"
                  type="buttom"
                  color="primary"/>
              </q-toolbar>
            </q-footer>
            <q-page-container>
              <q-page padding>
                <div>
                  <table>
                    <tr v-for="row in serverData" :key="row.id">
                      <td>
                        {{ row.idpropucto }}
                      </td>
                      <td>
                        {{ row.nombreproducto }}
                      </td>
                      <td>
                        {{ row.cantidad }}
                      </td>
                      <td>
                        {{ row.precio }}
                      </td>
                      <td>
                        {{ row.subtotal }}
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
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
      serverData: []
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const hidecarrito = ref(false)
    const layoutModal = ref(false)
    return {
      leftDrawerOpen,
      totalitemspedido: 0,
      hidecarrito,
      layoutModal,
      contentSize: 20,
      lorem: 'Item Pedido',
      nombrecliente: 'Cliente Público',
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    async hideShowCarrito (idcliente) {
      const resp = await clientesLib.getholds(idcliente)
      console.log(resp)
      if (resp.data.length > 0) {
        this.hidecarrito = true
        this.nombrecliente = resp.data[0].nombrecliente
        const idhold = resp.data[0].id
        // clientesLib.getcarrito(idcliente)
        const resp2 = await pedidosLib.getitemcarrito(idhold)
        console.log(resp2)
        const datos = resp2.data
        for (const i in datos) {
          const item = datos[i]
          const obj = {}
          obj.id = item.id
          obj.idproducto = item.idproducto
          obj.nombreproducto = item.nombreproducto
          obj.precio = item.precio
          obj.cantidad = item.cantidad
          obj.subtotal = item.subtotal
          this.serverData.push(obj)
        }
      }
    }
  },
  mounted () {
    this.idusuario = this.$q.localStorage.getItem('idusuario')
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
