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
      :rows="serverData"
      :columns="columns"
      row-key="id"
      :filter="filter"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-header
      hide-bottom
      :loading="loading"
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
            <q-card-section>
              <div style="display:grid;">
                <div
                  class="text-left"
                  @click="openSetItems( props.row.id, props.row.nombre, props.row.precio, props.row.preciocaj, props.row.unixcaja, props.row.costoactu, props.row.porciva, props.row.porkilos , props.row.disponible, props.row.imagen)">
                  <strong>{{props.row.id + '  ' + props.row.nombre }}</strong>
                </div>
                <div  style="display:flex;">
                  <div
                   style="display:flex; width: 150px;align-items: center;justify-content: center;"
                  >
                    <div
                      class="subtitleimagen"
                      v-if="props.row.imagen"
                      @click="openImagen(props.row.id, props.row.nombre, props.row.precio)">
                      <q-icon name="zoom_in" style="font-size: 24px;" /> ver imagen
                    </div>
                    <!-- <img
                      v-if="props.row.imagen"
                      :src="props.row.imagen"
                      height="100"
                    /> -->
                    <img
                      src="../assets/default.svg"
                      height="40"
                    />
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
              <img v-if="imagenproducto" :src="imagenproducto">
              <img v-else src="../assets/default.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nombreproducto }}</q-item-label>
            <q-item-label caption>
              <span style="color: white;background: darkgreen;border-radius: 5px;padding: 1px 4px;"> ${{ precioproducto.toFixed(2) }} </span>
              <span style="color: red;margin-left:30px;">Disp: {{ disponibleproducto }}</span>
              <span style="color: blue;margin-left:25px;">UniXcaja: {{ unixcaja }} </span>
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
          <q-btn
            style="font-size: 11px;"
            label="Cancelar"
            type="buttom"
            icon="close"
            color="negative"
            v-close-popup
          />
          <q-btn
            style="font-size: 11px;"
            label="Agregar al carrito"
            color="primary"
            v-close-popup
            icon="add_shopping_cart"
            @click="setCarrito()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="layoutModalimg" persistent>
      <q-card class="my-card" flat bordered style="width: 100%;">
        <q-card-section style="display: flex;height: 350px; justify-content: center; align-items: center;height: 350px;text-align: center;">
          <q-spinner
            color="primary"
            size="3em"
            v-if="loaderimg"
          />
          <img v-if="noimg" src="../assets/default.svg" style="height: 50%;">
          <img v-if="imagenproductoimg" :src="imagenproductoimg" style="height: 90%;">
          <div v-if="subtituloimg" class="subtitleimagenPopup">
            {{ nombreproductoimg }}
          </div>
          <div v-if="subtituloimg" class="precioimagenPopup">
            <q-icon name="sell" />
            Precio ${{ precioproductoimg.toFixed(2) }}
          </div>
        </q-card-section>
        <q-card-actions align="center" class="text-primary">
          <!-- <q-btn
            style=""
            label="Compartir"
            type="buttom"
            color="info"
            icon="share"
            v-close-popup
          /> -->
          <q-btn
            style=""
            label="Cerrar"
            type="buttom"
            color="negative"
            icon="close"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import {
  ref
  // computed,
  // watch,
  , defineComponent
} from 'vue'
// import VueSocialSharing from 'vue-social-sharing'
import productosLib from '../logic/productos'
import pedidosLib from '../logic/pedidos'
import clientesLib from '../logic/clientes'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      serverData: [],
      categoria: null,
      idusuario: this.$q.localStorage.getItem('idusuario'),
      usuario: this.$q.localStorage.getItem('usuario'),
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      }
    }
  },
  setup () {
    const layoutModal = ref(false)
    const layoutModalimg = ref(false)
    const noimg = ref(false)
    const loaderimg = ref(false)
    const imagenproducto = ref(false)
    const imagenproductoimg = ref(false)
    const loading = ref(false)
    const subtituloimg = ref(false)
    const filter = ref('')
    const nombreproducto = ref('')
    const nombreproductoimg = ref('')
    const precioproducto = ref(0)
    const precioproductoimg = ref(0)
    const disponibleproducto = ref(0)
    const cantidad = ref(1)
    const unixcaja = ref(1)
    return {
      filter,
      cantidad,
      nombreproducto,
      nombreproductoimg,
      precioproducto,
      precioproductoimg,
      noimg,
      loaderimg,
      subtituloimg,
      imagenproducto,
      disponibleproducto,
      unixcaja,
      layoutModal,
      layoutModalimg,
      imagenproductoimg,
      loading,
      columns: [
        { name: 'nombre', label: 'Nombre', field: 'nombre' },
        { name: 'id', label: 'Código', field: 'id' },
        { name: 'precio', label: 'Precio', field: 'precio' },
        { name: 'disponible', label: 'Disponible', field: 'disponible' }
      ]
    }
  },
  methods: {
    gotoClientes () {
      this.$router.push('/clientes')
    },
    async openImagen (id, nombre, precio) {
      this.layoutModalimg = true
      this.loaderimg = true
      this.noimg = false
      this.subtituloimg = false
      this.imagenproductoimg = false
      const resp = await productosLib.getimagenproducto(id)
      console.log(resp)
      this.imagenproductoimg = resp.data.length > 0 ? this.dataUrl(resp.data[0].imagen) : null
      console.log(this.imagenproductoimg)
      if (!this.imagenproductoimg) {
        this.noimg = true
      }
      this.loaderimg = false
      this.idproductoimg = id
      this.nombreproductoimg = nombre
      this.precioproductoimg = precio
      this.subtituloimg = true
    },
    openSetItems (id, nombre, precio, preciocaj, unixcaja, costoactu, porciva, porkilos, disponible, imagen) {
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
    async updateCarrito (idhold) {
      const totalItemHold = document.querySelector('.totalItemHold')
      totalItemHold.classList.remove('invisible')
      const resp = await pedidosLib.getitemcarrito(idhold)
      this.totalitemspedido = resp.data.length
      const circuloTotalItem = document.querySelector('.totalItemBlack')
      circuloTotalItem.textContent = this.totalitemspedido
    },
    async setCarrito () {
      const resp = await clientesLib.getholds(this.idusuario)
      if (resp.data.length > 0) {
        const idhold = resp.data[0].id
        await pedidosLib.setitemcarrito(idhold, this.idproducto, this.nombreproducto, this.precioproducto, this.cantidad, this.subtotal, this.preciocaj, this.unixcaja, this.costoactu, this.porciva, this.porkilos)
        this.updateCarrito(idhold)
        // clientesLib.getcarrito(idcliente)
        // this.$router.go(0)
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
      this.loading = true
      const resp = await productosLib.listar(categoria)
      this.loading = false
      this.serverData = []
      const datos = resp.data
      console.log(datos)
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.id = item.id
        obj.nombre = item.nombre
        obj.precio = item.porkilos === 1 ? item.precio : parseFloat(item.precio / item.unixcaja)
        obj.disponible = item.disponible
        obj.preciocaj = item.preciocaj
        obj.unixcaja = item.unixcaja
        obj.costoactu = item.costoactu
        obj.porciva = item.porciva
        obj.porkilos = item.porkilos
        obj.imagen = item.imagen
        /* if (item.imagen) {
          console.log(item.imagen)
          const respimg = await productosLib.getimagenproducto(item.imagen)
          console.log(respimg)
          obj.imagen = this.dataUrl(respimg.data[0].imagen)
        } */
        this.serverData.push(obj)
      }
      // console.log(this.serverData)
    },
    dataUrl (img) {
      // console.log(img.data)
      return 'data:image/jpeg;base64,' + btoa(
        new Uint8Array(img.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }
  },
  computed: {
    subtotal () {
      return (this.cantidad * this.precioproducto).toFixed(2)
    }
  },
  async mounted () {
    const totalItemCxc = document.querySelector('.totalItemCxc')
    const totalItemHold = document.querySelector('.totalItemHold')
    const circuloCxcItem = document.querySelector('.totalItemRed')
    const idcliente = this.$q.localStorage.getItem('idcliente')
    if (idcliente) {
      const resp = await clientesLib.getcxchold(this.usuario, idcliente)
      console.log(resp)
      if (resp.data.length > 0) {
        this.$q.dialog({
          title: 'Advertencia!',
          message: 'Este cliente tiene DEUDAS pendientes!',
          persistent: true
        }).onOk(() => {
          totalItemCxc.classList.remove('invisible')
          circuloCxcItem.textContent = resp.data.length
          if (totalItemHold.classList.contains('invisible')) {
            totalItemHold.classList.remove('invisible')
            const circuloTotalItem = document.querySelector('.totalItemBlack')
            circuloTotalItem.textContent = 0
          }
          // this.$router.go(0)
        })
      } else {
        circuloCxcItem.textContent = 0
        totalItemCxc.classList.add('invisible')
      // this.$router.go(0)
      // this.$q.localStorage.remove('idcliente')
      }
    }
    this.listarProductos(null)
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
  .subtitleimagen {
    text-align: center;
    pointer-events: all;
    position: absolute;
    padding: 0px;
    color: #fff;
    background: rgba(0, 0, 0, 0.47);
    font-size: 12px;
    bottom: 20px;
    width: 100px;
  }
  .subtitleimagenPopup {
    text-align: center;
    pointer-events: all;
    padding: 10px;
    color: #fff;
    background: rgba(0, 0, 0, 0.47);
    font-size: 12px;
    position: absolute;
    top: 10px;
    right: 10px;
    left: 10px;
  }
  .precioimagenPopup {
    text-align: center;
    pointer-events: all;
    padding: 5px;
    color: #fff;
    background: #075b6e;
    font-size: 12px;
    position: absolute;
    bottom: 2px;
    right: 50px;
    left: 50px;
    border-radius: 10px;
  }
</style>
