<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Vendedores
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
      :rows-per-page-options="[0]"
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
            <q-card-section style="display:block; height: 48px;">
              <div style="float: left; margin-right:10px;">{{ props.row.id }}</div>
              <div style="float: left; font-weight: bold;">{{ props.row.nombre }}</div>
              <div style="float: right;">
                <q-icon
                 class="iconApp"
                 name="view_list"
                 color="primary"
                 style="font-size: 24px;"
                 @click="gotoReportePedidos(props.row.id, props.row.nombre)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import vendedorLib from '../logic/vendedores'

export default defineComponent({
  name: 'Usuarios',
  data () {
    return {
      serverData: [],
      idusuario: this.$q.localStorage.getItem('idusuario')
    }
  },
  setup () {
    const filter = ref('')
    return {
      filter,
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      },
      columns: [
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'nombre', label: 'Nombre', field: 'nombre' }
      ]
    }
  },
  methods: {
    gotoIndex () {
      this.$router.push('/index')
    },
    gotoReportePedidos (usuarioreporte, nombrereporte) {
      this.$q.localStorage.set('usuarioreporte', usuarioreporte)
      this.$q.localStorage.set('nombrereporte', nombrereporte)
      this.$router.push('/reportepedidos')
    },
    async listarVendedores () {
      this.serverData = []
      const resp = await vendedorLib.listarVendedores()
      console.log(resp.data)
      this.serverData = resp.data
    }
  },
  mounted () {
    this.listarVendedores()
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
