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
            <q-card-section style="display:block; height: 48px;">
              <div style="float: left; margin-right:10px;">{{ props.row.id }}</div>
              <div style="float: left; font-weight: bold;">{{ props.row.nombre }}</div>
              <div style="float: right;">
                <q-icon
                 class="iconApp"
                 name="manage_accounts"
                 color="primary"
                 style="font-size: x-large;"
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
import { ref, computed, watch, defineComponent } from 'vue'
import vendedorLib from '../logic/vendedores'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Usuarios',
  data () {
    return {
      serverData: [],
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
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'nombre', label: 'Nombre', field: 'nombre' }
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
      this.$router.push('/index')
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
