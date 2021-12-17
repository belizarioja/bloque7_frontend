<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem" style="display: grid;">
          <span>Reporte pedidos</span>
          <span id="idNombreReporte" v-if="nombrereporte"> de {{ nombrereporte }}</span>
        </div>
    </div>
    <q-table
      grid
      :card-container-class="cardContainerClass"
      :rows="serverData"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section style="height: 64px;" @click="listaReporteItems(props.row.id, props.row.numedocu, props.row.nombrecliente)">
              <div style="float: left; margin-right:10px;">
                <div style="text-align: left;">{{ props.row.idcliente }} {{ props.row.nombrecliente }}</div>
                <div style="text-align: left;;font-weight: bold;">{{ props.row.numedocu }} {{ props.row.fecha }}</div>
              </div>
              <div style="float: right;">
                <q-icon
                 v-show="props.row.status"
                 class="iconApp"
                 name="check_circle"
                 color="positive"
                 style="font-size: x-large;margin-right:10px;"
                />
                <q-icon
                 v-show="!props.row.status"
                 class="iconApp"
                 name="disabled_by_default"
                 color="negative"
                 style="font-size: x-large;margin-right:10px;"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <!-- ITEMS DE COMPRA PEDIDO DEL CLIENTE -->
    <q-dialog v-model="layoutModal">
        <q-layout view="Lhh lpR fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title style="font-size: inherit;display: grid;">
                  <span style=""> Detalle del pedido {{ numedocu }} de: </span>
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
                      <td class="text-center" style="border-bottom: 1px dashed #757575;">
                        Cantidad
                      </td>
                      <td class="text-right"  style="border-bottom: 1px dashed #757575;">
                        Precio
                      </td>
                      <td class="text-right" style="border-bottom: 1px dashed #757575;">
                        Subtotal
                      </td>
                    </tr>
                    <tr v-for="row in serverDataItems" :key="row.id" style="font-size: smaller;">
                      <td style="font-size: x-small;">
                        {{ row.idproducto }}
                      </td>
                      <td style="font-size: x-small;">
                        {{ row.nombreproducto }}
                      </td>
                      <td class="text-center" >
                        {{ row.cantidad }}
                      </td>
                      <td class="text-right" >
                        {{ row.precio }}
                      </td>
                      <td class="text-right" >
                        {{ row.subtotal }}
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
        </q-layout>
      </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue'
import pedidosLib from '../logic/pedidos'
import { useQuasar } from 'quasar'
import moment from 'moment'

export default defineComponent({
  name: 'Reportepedidos',
  data () {
    return {
      serverData: [],
      serverDataItems: [],
      nombrereporte: false,
      usuario: this.$q.localStorage.getItem('usuario')
    }
  },
  setup () {
    const $q = useQuasar()
    const layoutModal = ref(false)
    function getItemsPerPage () {
      if ($q.screen.lt.sm) {
        return 12
      }
      if ($q.screen.lt.md) {
        return 24
      }
      return 36
    }
    const filter = ref('')
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })

    return {
      filter,
      pagination,
      layoutModal,
      nombrecliente: 'Cliente Público',
      numedocu: '',

      columns: [
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'numedocu', label: '# documento', field: 'numedocu' },
        { name: 'nombrecliente', label: 'Cliente', field: 'nombrecliente' },
        { name: 'idcliente', label: 'ID Cliente', field: 'idcliente' },
        { name: 'fecha', label: 'Fecha', field: 'fecha' }
      ],

      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? 'grid-masonry grid-masonry--' + ($q.screen.gt.sm ? '3' : '2')
          : null
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs
          ? $q.screen.gt.sm ? [3, 6, 9] : [3, 6]
          : [3]
      })
    }
  },
  methods: {
    gotoIndex () {
      if (this.usuario.toString().toUpperCase() === 'ADMIN') {
        this.$router.push('/vendedores')
      } else {
        this.$router.push('/index')
      }
    },
    async listarReporte () {
      this.serverData = []
      let usuarioreporte = this.usuario
      console.log(this.usuario.toUpperCase)
      if (this.usuario.toString().toUpperCase() === 'ADMIN') {
        usuarioreporte = this.$q.localStorage.getItem('usuarioreporte')
        this.nombrereporte = this.$q.localStorage.getItem('nombrereporte')
        const idNombreReporte = document.querySelector('#idNombreReporte')
        if (idNombreReporte) {
          idNombreReporte.textContent = 'de : ' + this.nombrereporte
        }
        this.$q.localStorage.remove('usuarioreporte')
        this.$q.localStorage.remove('nombrereporte')
      }
      console.log(usuarioreporte)
      const resp = await pedidosLib.reportePedidos(usuarioreporte)
      const datos = resp.data
      console.log(datos)
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.id = item.id
        obj.numedocu = item.numedocu
        obj.idcliente = item.idcliente
        obj.nombrecliente = item.nombrecliente
        obj.fecha = moment(item.fecha).format('YYYY-MM-DD')
        obj.status = true
        this.serverData.push(obj)
      }
    },
    async listaReporteItems (idpedido, numedocu, nombrecliente) {
      this.serverDataItems = []
      this.layoutModal = true
      this.numedocu = numedocu
      this.nombrecliente = nombrecliente
      const resp = await pedidosLib.reporteItemsPedidos(idpedido)
      console.log(resp)
      for (const i in resp.data) {
        const item = resp.data[i]
        const obj2 = {}
        obj2.idproducto = item.idproducto
        obj2.nombreproducto = item.nombreproducto
        obj2.precio = item.precio
        obj2.cantidad = item.cantidad
        obj2.subtotal = item.subtotal
        this.serverDataItems.push(obj2)
      }
    }
  },
  mounted () {
    this.listarReporte()
  }
})
</script>
<style scoped>
  .headerItem{
    margin: 20px;
    display: flex;
    align-items: center;
  }
  .menuitem {
    height: 60px;
    width: 60px;
    border: 1px solid green;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: xx-large;
  }
  .subHeaderItem{
    text-align: center;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }
  .done{
    background: aquamarine;
  }
</style>
