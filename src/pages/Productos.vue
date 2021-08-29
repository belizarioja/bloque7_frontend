<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoCategorias()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Productos
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
            <q-card-section @click="openSetItems( props.row.id, props.row.nombre, props.row.precio )">
              <div style="display:grid;">
                <div class="text-left">
                  <strong>{{ props.row.nombre }}</strong>
                </div>
                <div  style="display:flex;">
                  <div style="width: 150px;display: flex;align-items: center;justify-content: center;">
                    <img src="../assets/default.svg" height="40"/>
                  </div>
                  <div style="display:contents;">
                    <table style="width:100%;">
                      <tr class="headerTableItems">
                        <td style="width:50%;">
                          Código
                        </td>
                        <td>
                          Marca
                        </td>
                      </tr>
                      <tr class="rowTableItems">
                        <td>
                          {{props.row.codigo}}
                        </td>
                        <td>
                          {{props.row.marca}}
                        </td>
                      </tr>
                      <tr class="headerTableItems">
                        <td style="width:50%;">
                          Precio
                        </td>
                        <td>
                          Disponible
                        </td>
                      </tr>
                      <tr class="rowTableItemsPrecio">
                        <td>
                          $ {{props.row.precio}}
                        </td>
                        <td>
                          {{props.row.disp}}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <q-dialog v-model="layoutModal" persistent>
      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="../assets/default.svg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nombreproducto }}</q-item-label>
            <q-item-label caption>
              $ {{ precioproducto }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section>
            <q-input dense v-model="cantidad" autofocus type="number" label="Cantidad" min ="0.01" step="0.01"/>
          </q-card-section>

          <q-separator vertical />

          <q-card-section>
             <q-input dense v-model="pieza" type="number" label="Pieza" min ="0.01" step="0.01"/>
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            label="Agregar al carrito"
            v-close-popup
            @click="setCarrito()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import { ref, computed, watch, defineComponent } from 'vue'
import productosLib from '../logic/productos'
import ppedidosLib from '../logic/pedidos'
import clientesLib from '../logic/clientes'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      serverData: [],
      nombreproducto: ref(''),
      precioproducto: ref('')
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
    const cantidad = ref(1)
    const pieza = ref(cantidad)
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })

    return {
      filter,
      cantidad,
      pieza,
      pagination,
      layoutModal,

      columns: [
        { name: 'nombre', label: 'Nombre', field: 'nombre' },
        { name: 'codigo', label: 'Código', field: 'codigo' },
        { name: 'precio', label: 'Precio', field: 'precio' },
        { name: 'marca', label: 'Marca', field: 'marca' }
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
    gotoCategorias () {
      this.$router.push('/categorias')
    },
    openSetItems (id, nombre, precio) {
      this.idproducto = id
      this.nombreproducto = nombre
      this.precioproducto = precio
      this.layoutModal = true
    },
    async setCarrito () {
      const resp = await clientesLib.getholds(this.idusuario)
      console.log(resp)
      if (resp.data.length > 0) {
        const idhold = resp.data[0].id
        // console.log(idhold, this.cantidad, this.pieza, this.precioproducto)
        const subtotal = this.cantidad * parseFloat(this.precioproducto)
        await ppedidosLib.setitemcarrito(idhold, this.idproducto, this.nombreproducto, this.precioproducto, this.cantidad, this.pieza, subtotal)
        // clientesLib.getcarrito(idcliente)
      }
    },
    async listarProductos (categoria) {
      const resp2 = await productosLib.listar(categoria)
      this.serverData = []
      const datos = resp2.data
      console.log(datos)
      for (const i in datos) {
        const item = datos[i]
        // console.log(item)
        const obj = {}
        obj.id = item.id
        obj.nombre = item.Nom_Producto
        obj.codigo = item.Cod_Producto
        obj.precio = item.P_Dollar
        obj.marca = item.Marca
        obj.disp = 12
        this.serverData.push(obj)
      }
      console.log(this.serverData)
    }
  },
  mounted () {
    this.idusuario = this.$q.localStorage.getItem('idusuario')
    const categoria = this.$q.localStorage.getItem('categoria')
    console.log(this.idusuario)
    this.listarProductos(categoria)
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
    font-size: x-large;
  }
  .headerTableItems{
    background: aliceblue;
    font-weight: bold;
    height: 23px;
  }
  .rowTableItems{
    font-weight: bold;
    height: 23px;
  }
  .rowTableItemsPrecio{
    font-weight: bold;
    height: 23px;
    color: crimson;
    font-weight: bold;
  }
</style>
