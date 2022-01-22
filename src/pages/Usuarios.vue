<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Usuarios
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
          <q-card>
            <q-card-section style="height: 90px;">
              <div style="float: left; margin-right:10px;">
                <div style="text-align: left;">{{ props.row.usuario }} {{ props.row.nombre }}</div>
                <div style="text-align: left;font-weight: bold;">Útimo acceso : {{ props.row.fe_ult_acceso }}</div>
                <div style="text-align: left;">Dispositivo : {{ props.row.uuid }}</div>
              </div>
              <div style="float: right;">
                <q-icon
                 v-show="props.row.status"
                 class="iconApp"
                 name="check_circle"
                 color="positive"
                 style="font-size: x-large;margin-right:10px;"
                 @click="hideShow(props.row.status, props.row.id, props.row.nombre)"
                />
                <q-icon
                 v-show="!props.row.status"
                 class="iconApp"
                 name="disabled_by_default"
                 color="negative"
                 style="font-size: x-large;margin-right:10px;"
                 @click="hideShow(props.row.status, props.row.id, props.row.nombre)"
                />
                <q-icon
                 v-show="props.row.uuid !== 'S/Inf'"
                 class="iconApp"
                 name="phonelink_erase"
                 color="negative"
                 style="font-size: x-large;margin-right:10px;"
                 @click="resetDevice(props.row.id, props.row.nombre)"
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
import authLib from '../logic/auth'
import moment from 'moment'

export default defineComponent({
  name: 'Usuarios',
  data () {
    return {
      serverData: []
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
        { name: 'nombre', label: 'Nombre', field: 'nombre' },
        { name: 'rif', label: 'Rif', field: 'rif' }
      ]
    }
  },
  methods: {
    gotoIndex () {
      this.$router.push('/index')
    },
    async listarUsuarios () {
      this.serverData = []
      const resp = await authLib.usuarios()
      const datos = resp.data
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.id = item.id
        obj.usuario = item.usuario
        obj.clave = item.clave
        obj.nombre = item.nombre
        obj.idrol = item.idrol
        obj.rol = item.rol
        obj.uuid = item.uuid ? item.uuid : 'S/Inf'
        obj.fe_ult_acceso = item.fe_ult_acceso ? moment(item.fe_ult_acceso).format('DD/MM/YYYY HH:mm:ss') : 'S/Inf'
        obj.status = item.status
        this.serverData.push(obj)
      }
    },
    hideShow (val, id, nombre) {
      const valor = val === 1 ? 0 : 1
      const msg = val === 0 ? 'HABILITAR' : 'INHABILITAR'
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Desea ' + msg + ' a ' + nombre + '?',
        ok: {
          color: 'primary',
          label: 'Sí'
        },
        cancel: {
          color: 'secondary',
          label: 'No'
        },
        persistent: true
      }).onOk(async () => {
        await authLib.hideShowUsuarios(valor, id)
        this.listarUsuarios()
      })
    },
    resetDevice (id, nombre) {
      this.$q.dialog({
        title: 'Confirmación!',
        message: 'Desea RESETEAR el dispositivo de la cuenta de ' + nombre + '?',
        ok: {
          color: 'primary',
          label: 'Sí'
        },
        cancel: {
          color: 'secondary',
          label: 'No'
        },
        persistent: true
      }).onOk(async () => {
        await authLib.resetDevice(id)
        this.listarUsuarios()
      })
    }
  },
  mounted () {
    this.idusuario = this.$q.localStorage.getItem('idusuario')
    this.listarUsuarios()
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
