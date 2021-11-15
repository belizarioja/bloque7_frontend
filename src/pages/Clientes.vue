<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Clientes asignados
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
            <q-card-section
              :class="{'done' : props.row.chk }"
              @click="gotoCategorias( props.row.idcliente, props.row.nombrecliente )">
              <strong>{{ props.row.nombrecliente }}</strong>
              <div>RIF {{ props.row.rifcliente }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue'
import clientesLib from '../logic/clientes'
import vendedorLib from '../logic/vendedores'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Clientes',
  data () {
    return {
      serverData: [],
      idVendedor: this.$q.localStorage.getItem('usuario'),
      idusuario: this.$q.localStorage.getItem('idusuario')
    }
  },
  setup () {
    const $q = useQuasar()
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

      columns: [
        { name: 'nombre', label: 'Nombre', field: 'nombre' },
        { name: 'rif', label: 'Rif', field: 'rif' }
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
    async gotoCategorias (idcliente, nombrecliente) {
      console.log(this.idusuario, idcliente, nombrecliente)
      await clientesLib.setupcarrito(this.idusuario, idcliente, nombrecliente)
      this.$router.push('/categorias')
    },
    gotoIndex () {
      this.$router.push('/index')
    },
    async listarClientes () {
      this.serverData = []
      const resp = await clientesLib.getholds(this.idusuario)
      let chk = 0
      console.log(resp)
      if (resp.data.length > 0) {
        chk = resp.data[0].idcliente
        // clientesLib.getcarrito(idcliente)
      }
      const resp2 = await vendedorLib.listarVendedorClientes(this.idVendedor)
      console.log(resp2)
      const datos = resp2.data
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.idcliente = item.idcliente
        obj.nombrecliente = item.nombrecliente
        obj.rifcliente = item.rifcliente
        obj.chk = false
        // console.log(chk, item.id)
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
