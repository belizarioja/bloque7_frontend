<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return"/>
        </div>
        <div class="subHeaderItem">
          Seleccione cliente
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
            <q-item
              :class="{'done' : props.row.chk }"
              @click="gotoProductos( props.row.idcliente, props.row.nombrecliente, props.row.rifcliente)"
              clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  {{ iniciales(props.row.nombrecliente) }}
                </q-avatar>
              </q-item-section>
              <q-item-section style="text-align: left;">
                <q-item-label>{{ props.row.nombrecliente }}</q-item-label>
                <q-item-label caption>RIF {{ props.row.rifcliente }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import moment from 'moment'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Clientes',
  data () {
    return {
      serverData: [],
      usuario: this.$q.localStorage.getItem('usuario'),
      idusuario: this.$q.localStorage.getItem('idusuario'),
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      }
    }
  },
  setup () {
    const filter = ref('')
    return {
      filter,
      columns: [
        { name: 'nombrecliente', label: 'Nombre', field: 'nombrecliente' },
        { name: 'rifcliente', label: 'Rif', field: 'rifcliente' }
      ]
    }
  },
  methods: {
    iniciales (nombre) {
      const primer = nombre.split(' ')[0].charAt(0)
      const segundo = nombre.split(' ')[1].charAt(0)
      return primer + segundo
    },
    gotoProductos (idcliente, nombrecliente, rifcliente) {
      this.$q.localStorage.set('idcliente', idcliente)
      const totalItemCxc = document.querySelector('.totalItemCxc')
      const circuloCxcItem = document.querySelector('.totalItemRed')
      const cuentasxc = this.$q.localStorage.getItem('cuentasxc')
      const find = cuentasxc.filter(obj => obj.idcliente === idcliente)
      if (find.length > 0) {
        this.$q.dialog({
          title: 'Advertencia!',
          message: 'Este cliente tiene DEUDAS pendientes!',
          ok: {
            color: 'dark',
            style: 'font-size: 12px;',
            label: 'Aceptar'
          },
          cancel: {
            color: 'secondary',
            style: 'font-size: 12px;',
            label: 'Cancelar'
          },
          persistent: true
        }).onOk(() => {
          totalItemCxc.classList.remove('invisible')
          circuloCxcItem.textContent = find.length
          this.updateClienteCarrito(idcliente, nombrecliente, rifcliente)
          this.$router.push('/productos')
        })
      } else {
        circuloCxcItem.textContent = 0
        totalItemCxc.classList.add('invisible')
        this.updateClienteCarrito(idcliente, nombrecliente, rifcliente)
        this.$router.push('/productos')
      }
    },
    updateClienteCarrito (id, nombre, rif) {
      const holds = this.$q.localStorage.getItem('holds')
      let cantitemscarrito = 0
      const index = holds.findIndex(obj => obj.status === 1)
      if (index === -1) {
        const obj = {}
        obj.id = null
        obj.indice = holds.length
        obj.idcliente = id
        obj.idusuario = this.idusuario
        obj.nombrecliente = nombre
        obj.rifcliente = rif
        obj.fecha = moment().format('YYYY-MM-DD HH:mm:ss')
        obj.status = 1
        obj.subtotal = 0
        obj.cantitemscarrito = 0
        holds.push(obj)
      } else {
        holds[index].fecha = moment().format('YYYY-MM-DD HH:mm:ss')
        holds[index].idcliente = id
        holds[index].nombrecliente = nombre
        holds[index].rifcliente = rif
        cantitemscarrito = holds[index].cantitemscarrito
      }
      this.$q.localStorage.remove('holds')
      this.$q.localStorage.set('holds', holds)
      const totalItemHold = document.querySelector('.totalItemHold')
      if (totalItemHold.classList.contains('invisible')) {
        totalItemHold.classList.remove('invisible')
      }
      const circuloTotalItem = document.querySelector('.totalItemBlack')
      circuloTotalItem.textContent = cantitemscarrito
    },
    gotoIndex () {
      this.$router.push('/index')
    },
    listarClientes () {
      this.serverData = []
      const chk = this.$q.localStorage.getItem('idcliente')
      const datos = this.$q.localStorage.getItem('clientes')
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.idcliente = item.idcliente
        obj.nombrecliente = item.nombrecliente
        obj.rifcliente = item.rifcliente
        obj.chk = false
        if (chk === item.idcliente) {
          obj.chk = true
        }
        this.serverData.push(obj)
      }
    }
  },
  mounted () {
    this.listarClientes()
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
    height: 40px;
    width: 45px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    background: #5eb228;
    color: white;
  }
  .subHeaderItem{
    text-align: center;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
  }
  .done{
    background: #d6d6d6;
  }
  .circuloName {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: white;
    background: #5eb228;
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }
</style>
