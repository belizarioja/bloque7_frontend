<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Clientes con deudas
        </div>
    </div>
    <!-- <q-table
      grid
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
          <q-card @click="hideShowCxc(props.row.idcliente, props.row.nombrecliente, props.row.nombrevendedor)">
            <q-card-section>
              <strong>{{ props.row.nombrecliente }}</strong>
              <div>RIF {{ props.row.rifcliente }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table> -->
    <!-- INICIO NUEVA TABLA EXPANSIVA -->
    <q-table
      :rows="serverData"
      :columns="columns"
      ref="myTable"
      dense
      row-key="idcliente"
      :filter="filter"
      hide-header
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top>
        <q-btn size="xs" color="secondary" round dense @click="toggleExpansions" :icon="expansionsToggled ? 'remove' : 'add'"></q-btn>
        <span style="font-size: 12px;margin-left: 6px;">{{ hideShowAll }}</span>
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            style="text-align: left;"
            :key="col.name"
            :props="props"          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="xs" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td
            auto-width
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-table
              style="background: #f5f5f5;"
              :rows="props.row.details"
              dense
              :columns="columns2"
              row-key="id"
              v-model:pagination="pagination"
              :rows-per-page-options="[0]"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="text-italic text-purple"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:pagination="scope">
                <q-btn
                 style="font-size: 12px;font-weight: bold;"
                  color="primary"
                  :label="'Vendedor: ' + props.row.nombrevendedor"
                  round
                  dense
                  flat
                  :disable="scope.isFirstPage"
                  @click="scope.prevPage"
                />
                <q-btn
                 style="font-size: 12px;font-weight: bold;margin-left: 20px;"
                  color="primary"
                  :label="'Total: $' + props.row.totalcxc.toFixed(2)"
                  round
                  dense
                  flat
                  :disable="scope.isFirstPage"
                  @click="scope.prevPage"
                />
              </template>
            </q-table>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <!-- FIN NUEVA TABLA EXPANSIVA -->
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import clientesLib from '../logic/clientes'
import moment from 'moment'

export default defineComponent({
  name: 'Clientes',
  data () {
    return {
      expansionsToggled: false,
      hideShowAll: 'Mostrar todos',
      serverData: [],
      serverDataCxc: [],
      layoutModalPays: false,
      totalcxc: 0,
      nombrecliente: '',
      nombrevendedor: '',
      usuario: this.$q.localStorage.getItem('usuario').toString().toUpperCase(),
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
        { name: 'idcliente', label: 'ID', field: 'idcliente', style: 'text-align: left;font-size: 10px;font-weight: bold;' },
        { name: 'nombrecliente', label: 'Nombre', field: 'nombrecliente', style: 'white-space: pre-wrap;text-align: left;font-size: 10px;font-weight: bold;' },
        { name: 'rifcliente', label: 'RIF', field: 'rifcliente', style: 'text-align: left;font-size: 10px;font-weight: bold;' }
      ],
      columns2: [
        { name: 'id', label: '# Control', field: 'id', style: 'text-align: rigth;font-size: 10px;font-weight: bold;' },
        { name: 'fecha', label: 'Fecha', field: 'fecha', style: 'text-align: rigth;font-size: 10px;font-weight: bold;' },
        { name: 'dias', label: 'Días', field: 'dias', style: 'color: red;text-align: center;font-size: 10px;font-weight: bold;' },
        { name: 'monto', label: 'Monto', field: 'monto', style: 'text-align: rigth;font-size: 10px;font-weight: bold;' },
        { name: 'saldo', label: 'Saldo', field: 'saldo', style: 'text-align: rigth;font-size: 10px;font-weight: bold;' }
      ]
    }
  },
  methods: {
    toggleExpansions () {
      this.expansionsToggled = !this.expansionsToggled
      let rowArray = []
      if (this.expansionsToggled) {
        this.hideShowAll = 'Ocultar todos'
        rowArray = this.serverData.map(row => row.idcliente)
        // depends on what your key is set up to be - here it is row.name
      } else {
        this.hideShowAll = 'Mostrar todos'
        rowArray = []
      }
      this.$refs.myTable.setExpanded(rowArray)
    },
    calcDiffHours (fecha) {
      const now = moment()
      const end = moment(fecha, 'YYYY-MM-DD')
      // console.log(now, end)
      const duration = moment.duration(now.diff(end))
      return duration.asDays().toFixed(0)
    },
    async listarCxc () {
      // console.log(this.usuario)
      this.serverData = []
      const resp = await clientesLib.getcxc(this.usuario)
      console.log(resp)
      const datos = resp.data
      for (const i in datos) {
        const item = datos[i]

        const obj2 = {}
        obj2.id = item.id
        obj2.fecha = moment(item.fecha).format('YYYY-MM-DD')
        obj2.dias = this.calcDiffHours(item.fecha)
        obj2.monto = '$' + item.monto.toFixed(2)
        obj2.saldo = '$' + item.saldo.toFixed(2)
        const index = this.serverData.findIndex(obj => obj.idcliente === item.idcliente)
        if (index === -1) {
          const obj = {}
          obj.totalcxc = 0
          obj.details = []
          obj.idcliente = item.idcliente
          obj.nombrecliente = item.nombrecliente
          obj.nombrevendedor = item.nombrevendedor
          obj.rifcliente = item.rifcliente
          obj.nombrevendedor = item.nombrevendedor
          obj.totalcxc += parseFloat(item.saldo)
          obj.details.push(obj2)
          this.serverData.push(obj)
        } else {
          this.serverData[index].totalcxc += parseFloat(item.saldo)
          this.serverData[index].details.push(obj2)
        }
      }
    },
    gotoIndex () {
      this.$router.push('/index')
    }
    /* async hideShowCxc (idcliente, nombrecliente, nombrevendedor) {
      this.serverDataCxc = []
      this.totalcxc = 0
      this.layoutModalPays = true
      this.nombrecliente = nombrecliente
      this.nombrevendedor = nombrevendedor
      const resp = await clientesLib.getcxchold(this.usuario, idcliente)
      console.log(resp)
      if (resp.data.length > 0) {
        for (const i in resp.data) {
          const item = resp.data[i]
          const obj2 = {}
          obj2.id = item.id
          obj2.fecha = moment(item.fecha).format('YYYY-MM-DD')
          obj2.dias = this.calcDiffHours(item.fecha)
          obj2.monto = item.monto
          obj2.saldo = item.saldo
          this.totalcxc += parseFloat(obj2.saldo)
          this.serverDataCxc.push(obj2)
        }
        const idTotalCxc = document.querySelector('#idTotalCxc')
        if (idTotalCxc) {
          idTotalCxc.textContent = 'Total : $' + this.totalcxc.toFixed(2)
        }
        console.log(this.totalcxc)
      }
    } */
  },
  mounted () {
    this.listarCxc()
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
