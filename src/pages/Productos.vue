<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoClientes()">
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
            <q-card-section @click="openSetItems( props.row.id, props.row.nombre, props.row.precio, props.row.preciocaj, props.row.unixcaja, props.row.costoactu, props.row.porciva, props.row.porkilos , props.row.disponible)">
              <div style="display:grid;">
                <div class="text-left">
                  <strong>{{props.row.id + '  ' + props.row.nombre }}</strong>
                </div>
                <div  style="display:flex;">
                  <div style="width: 150px;display: flex;align-items: center;justify-content: center;">
                    <img src="../assets/default.svg" height="40"/>
                  </div>
                  <div style="display:contents;">
                    <table style="width:100%;">
                      <tr class="headerTableItems">
                        <td style="width:50%;">
                          Precio caja
                        </td>
                        <td>
                          Unidad x caja
                        </td>
                      </tr>
                      <tr class="rowTableItemsPrecio">
                        <td>
                           $ {{ (props.row.precio * props.row.unixcaja).toFixed(2)}}
                        </td>
                        <td>
                          {{ props.row.unixcaja }}
                        </td>
                      </tr>
                      <tr class="headerTableItems">
                        <td style="width:50%;">
                          Precio unidad
                        </td>
                        <td>
                          Disponible
                        </td>
                      </tr>
                      <tr class="rowTableItemsPrecio">
                        <td>
                          $ {{props.row.precio.toFixed(2)}}
                        </td>
                        <td>
                          {{props.row.disponible}}
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
              <span style="color: white;background: darkgreen;border-radius: 5px;padding: 1px 4px;"> ${{ precioproducto.toFixed(2) }} </span>
              <span style="color: red;margin-left:10px;">Disp: {{ disponibleproducto }}</span>
              <span style="color: blue;margin-left:8px;"> UniXcaja: {{ unixcaja }} </span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section>
            <q-input dense v-model="cantidad" autofocus type="number" label="Cantidad" min ="1"/>
          </q-card-section>

          <q-separator vertical />

          <q-card-section>
             <q-input dense v-model="subtotal" type="number" label="Subtotal" readonly/>
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
import pedidosLib from '../logic/pedidos'
import clientesLib from '../logic/clientes'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      serverData: [],
      categoria: null,
      idusuario: this.$q.localStorage.getItem('idusuario')
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
    const nombreproducto = ref('')
    const precioproducto = ref(0)
    const disponibleproducto = ref(0)
    const cantidad = ref(1)
    const unixcaja = ref(1)
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
      nombreproducto,
      precioproducto,
      disponibleproducto,
      unixcaja,
      pagination,
      layoutModal,
      columns: [
        { name: 'nombre', label: 'Nombre', field: 'nombre' },
        { name: 'id', label: 'Código', field: 'id' },
        { name: 'precio', label: 'Precio', field: 'precio' },
        { name: 'marca', label: 'Marca', field: 'marca' },
        { name: 'disponible', label: 'Disponible', field: 'disponible' }
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
    gotoClientes () {
      this.$router.push('/clientes')
    },
    openSetItems (id, nombre, precio, preciocaj, unixcaja, costoactu, porciva, porkilos, disponible) {
      this.idproducto = id
      this.nombreproducto = nombre
      this.precioproducto = precio
      this.disponibleproducto = disponible
      this.preciocaj = preciocaj
      this.unixcaja = unixcaja
      this.costoactu = costoactu
      this.porciva = porciva
      this.porkilos = porkilos
      this.layoutModal = true
    },
    async setCarrito () {
      const resp = await clientesLib.getholds(this.idusuario)
      if (resp.data.length > 0) {
        const idhold = resp.data[0].id
        await pedidosLib.setitemcarrito(idhold, this.idproducto, this.nombreproducto, this.precioproducto, this.cantidad, this.subtotal, this.preciocaj, this.unixcaja, this.costoactu, this.porciva, this.porkilos)
        // clientesLib.getcarrito(idcliente)
        this.$router.go(0)
      } else {
        this.$q.dialog({
          title: 'Oops!',
          message: 'Debe seleccionar cliente!',
          persistent: true
        })
        this.gotoClientes()
      }
    },
    async listarProductos (categoria) {
      const resp2 = await productosLib.listar(categoria)
      this.serverData = []
      const datos = resp2.data
      console.log(datos)
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.id = item.id
        obj.nombre = item.nombre
        obj.precio = item.porkilos === 1 ? item.precio : parseFloat(item.precio / item.unixcaja)
        obj.marca = item.marca
        obj.disponible = item.disponible
        obj.preciocaj = item.preciocaj
        obj.unixcaja = item.unixcaja
        obj.costoactu = item.costoactu
        obj.porciva = item.porciva
        obj.porkilos = item.porkilos
        this.serverData.push(obj)
      }
      // console.log(this.serverData)
    }
  },
  computed: {
    subtotal () {
      return (this.cantidad * this.precioproducto).toFixed(2)
    }
  },
  mounted () {
    // const categoria = this.$q.localStorage.getItem('categoria')
    this.listarProductos(this.categoria)
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
  .headerTableItems{
    background: aliceblue;
    font-weight: bold;
    height: 23px;
    font-size: smaller;
  }
  .rowTableItems{
    font-weight: bold;
    font-size: x-small;
    height: 23px;
  }
  .rowTableItemsPrecio{
    font-weight: bold;
    height: 23px;
    color: crimson;
    font-weight: bold;
  }
</style>
