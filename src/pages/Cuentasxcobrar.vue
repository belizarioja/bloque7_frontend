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
    <q-table
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
    </q-table>
    <q-dialog v-model="layoutModalPays">
        <q-layout view="Lhh lpR fff" container class="bg-white">
           <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title style="font-size: inherit;display: grid;">
                  <span style=""> Deuda pendiente de: </span>
                  <span style="">{{ nombrecliente }}</span>
                </q-toolbar-title>
                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>
            <q-page-container>
              <q-page padding>
                <div>
                  <table style="width: -webkit-fill-available;">
                    <tr>
                      <td style="border-bottom: 1px dashed #757575;">
                        # Control
                      </td>
                      <td style="border-bottom: 1px dashed #757575;">
                        Fecha
                      </td> <td style="border-bottom: 1px dashed #757575;text-align: center;color: red;">
                        Dias
                      </td>
                      <td class="text-right" style="border-bottom: 1px dashed #757575;">
                        Monto
                      </td>
                      <td  class="text-right" style="border-bottom: 1px dashed #757575;">
                        Saldo
                      </td>
                    </tr>
                    <tr v-for="row in serverDataCxc" :key="row.id" style="font-size: smaller;">
                      <td>
                        {{ row.id }}
                      </td>
                      <td>
                        {{ row.fecha }}
                      </td>
                      <td style="text-align: center;color: red;">
                        {{ row.dias }}
                      </td>
                      <td class="text-right">
                        {{ row.monto.toFixed(2) }}
                      </td>
                      <td class="text-right">
                        {{ row.saldo.toFixed(2) }}
                      </td>
                    </tr>
                  </table>
                </div>
              </q-page>
            </q-page-container>
            <q-footer class="bg-black text-white">
              <q-toolbar inset style="display: contents;">
                  <div style="margin: 0 20px;width: -webkit-fill-available;">
                    Vendedor : {{ nombrevendedor }}
                  </div>
                  <div id="idTotalCxc" style="margin: 0 20px;width: -webkit-fill-available;">
                    Total : {{ totalcxc.toFixed(2) }}
                  </div>
              </q-toolbar>
            </q-footer>
        </q-layout>
    </q-dialog>
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
        { name: 'nombrecliente', label: 'Nombre', field: 'nombrecliente' },
        { name: 'rifcliente', label: 'Rif', field: 'rifcliente' }
      ]
    }
  },
  methods: {
    calcDiffHours (fecha) {
      const now = moment()
      const end = moment(fecha, 'YYYY-MM-DD')
      console.log(now, end)
      const duration = moment.duration(now.diff(end))
      return duration.asDays().toFixed(0)
    },
    async listarCxc () {
      console.log(this.usuario)
      this.serverData = []
      const resp = await clientesLib.getcxc(this.usuario)
      console.log(resp)
      const datos = resp.data
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.idcliente = item.idcliente
        obj.nombrecliente = item.nombrecliente
        obj.nombrevendedor = item.nombrevendedor
        obj.rifcliente = item.rifcliente
        this.serverData.push(obj)
      }
    },
    gotoIndex () {
      this.$router.push('/index')
    },
    async hideShowCxc (idcliente, nombrecliente, nombrevendedor) {
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
    }
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
