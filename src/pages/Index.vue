<template>
  <q-page class="text-center">
    <div class="headerItem">
      <div class="subHeaderItem">
        Módulos
      </div>
    </div>
    <q-card class="my-card" style="margin: 20px;">
      <q-card-section style="display: flex; padding: 7px;height: 200px;justify-content: center;">
        <div
          class="menuitem"
          v-show="idrol > 1"
          @click="gotoClientes()">
          <q-icon class="iconApp" name="point_of_sale" color="primary" />
          <div class="tituloApp">PEDIDOS</div>
        </div>
        <div
          class="menuitem"
          v-show="idrol === 1"
          @click="gotoUsuarios()">
          <q-icon class="iconApp" name="account_circle" color="primary" />
          <div class="tituloApp">USUARIOS</div>
        </div>
        <div
          class="menuitem"
           v-show="idrol === 1"
          @click="gotoVendedores()">
          <q-icon class="iconApp" name="manage_accounts" color="primary" />
          <div class="tituloApp">VENDEDORES</div>
        </div>
        <div
          class="menuitem"
           v-show="idrol === 1"
          @click="gotoProductos()">
          <q-icon class="iconApp" name="price_change" color="primary" />
          <div class="tituloApp">PRODUCTOS</div>
        </div>
        <div
          class="menuitem"
           v-show="idrol > 1"
          @click="gotoCxc()">
          <q-icon class="iconApp" name="paid" color="primary" />
          <div class="tituloApp">CTAS X COBRAR</div>
        </div>
        <div
          class="menuitem"
          v-show="idrol > 1"
          @click="gotoReportePedidos()">
          <q-icon class="iconApp" name="view_list" color="primary" />
          <div class="tituloApp">REPORTE</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-item>
        <div @click="getSincronized()">
          <q-icon class="iconApp" name="system_update" color="primary" />
        </div>
        <q-item-section>
          <q-item-label style="font-size: 24px;">Sincronizar</q-item-label>
          <q-item-label caption>
            Último <span id="feultgetId">{{feultget}}</span>
          </q-item-label>
        </q-item-section>
        <div>
          <q-icon class="iconApp" name="pending_actions" color="secondary" />
        </div>
      </q-item>
    </q-card>
    <div v-if="loader" class="procesando">
      <span style="display:grid;">Sincronizando, espere...
      <q-linear-progress indeterminate />
      </span>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import productosLib from '../logic/productos'
import clientesLib from '../logic/clientes'
import vendedorLib from '../logic/vendedores'
// import pedidosLib from '../logic/pedidos'
import moment from 'moment'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      idrol: this.$q.localStorage.getItem('idrol'),
      usuario: this.$q.localStorage.getItem('usuario'),
      idusuario: this.$q.localStorage.getItem('idusuario'),
      idsucursal: this.$q.localStorage.getItem('idsucursal'),
      feultget: this.$q.localStorage.getItem('feultget'),
      loader: false
    }
  },
  methods: {
    gotoClientes () {
      this.$router.push('/clientes')
    },
    gotoUsuarios () {
      this.$router.push('/usuarios')
    },
    gotoVendedores () {
      this.$router.push('/vendedores')
    },
    gotoCxc () {
      this.$router.push('/cuentasxcobrar')
    },
    gotoReportePedidos () {
      this.$router.push('/reportepedidos')
    },
    gotoProductos () {
      this.$router.push('/productos')
    },
    async getItemsHolds () {
      // const serverData = []
      const resp = await clientesLib.getitemsholds(this.idusuario)
      console.log(resp)
      const holds = this.$q.localStorage.getItem('holds')
      const itemsholds = resp.data
      let cantsaves = 0
      for (const i in holds) {
        let cantitemscarrito = 0
        let subtotal = 0
        itemsholds.forEach(function (item) {
          if (holds[i].id === item.idhold) {
            item.indice = holds[i].indice
            cantitemscarrito = parseInt(cantitemscarrito) + 1
            subtotal += parseFloat(item.subtotal)
          }
        })
        holds[i].cantitemscarrito = cantitemscarrito
        holds[i].subtotal = subtotal
        if (holds[i].status === 1) {
          this.$q.localStorage.set('idcliente', holds[i].idcliente)

          const circuloTotalItem = document.querySelector('.totalItemBlack')
          const totalItemHold = document.querySelector('.totalItemHold')

          if (totalItemHold.classList.contains('invisible')) {
            totalItemHold.classList.remove('invisible')
          }
          if (circuloTotalItem) {
            circuloTotalItem.textContent = cantitemscarrito
          }
          const cuentasxc = this.$q.localStorage.getItem('cuentasxc')
          console.log(cuentasxc)
          console.log(holds[i].idcliente)
          if (cuentasxc) {
            const find = cuentasxc.filter(obj => obj.idcliente === holds[i].idcliente)
            if (find.length > 0) {
              const totalItemCxc = document.querySelector('.totalItemCxc')
              const circuloCxcItem = document.querySelector('.totalItemRed')
              totalItemCxc.classList.remove('invisible')
              circuloCxcItem.textContent = find[0].details.length
            }
          }
        }
        if (holds[i].status === 0) {
          cantsaves = parseInt(cantsaves) + 1
        }
      }
      this.$q.localStorage.remove('holds')
      this.$q.localStorage.set('holds', holds)
      this.$q.localStorage.remove('itemsholds')
      this.$q.localStorage.set('itemsholds', itemsholds)
      const idTotalSaves = document.querySelector('#idTotalSaves')
      const totalItemSaves = document.querySelector('.totalItemSaves')
      const circuloTotalSaves = document.querySelector('.totalItemBlue')
      if (idTotalSaves) {
        idTotalSaves.textContent = 'Total : $' + this.totalsaves.toFixed(2)
      }
      if (circuloTotalSaves) {
        circuloTotalSaves.textContent = cantsaves
      }
      if (totalItemSaves.classList.contains('invisible')) {
        totalItemSaves.classList.remove('invisible')
      }
    },
    async getHolds () {
      const serverData = []
      const resp = await clientesLib.getholds(this.idusuario)
      console.log(resp)
      for (const i in resp.data) {
        const item = resp.data[i]
        item.indice = i
        serverData.push(item)
      }
      this.$q.localStorage.remove('holds')
      this.$q.localStorage.set('holds', serverData)
    },
    async getClientes () {
      const serverData = []
      const resp2 = await vendedorLib.listarVendedorClientes(this.usuario)
      console.log(resp2)
      const datos = resp2.data
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.idcliente = item.idcliente
        obj.nombrecliente = item.nombrecliente
        obj.rifcliente = item.rifcliente
        serverData.push(obj)
      }
      this.$q.localStorage.remove('clientes')
      this.$q.localStorage.set('clientes', serverData)
    },
    async getUsuarios () {
      const serverData = []
      if (this.idrol === 1) {
        console.log('Aqui usuarios')
        /* const resp = await productosLib.listar(null)
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
          serverData.push(obj)
        } */
        this.$q.localStorage.remove('usuarios')
        this.$q.localStorage.set('usuarios', serverData)
      }
    },
    async getVendedores () {
      const serverData = []
      if (this.idrol === 1) {
        console.log('Aqui vendedores')
        /* const resp = await productosLib.listar(null)
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
          serverData.push(obj)
        } */
        this.$q.localStorage.remove('vendedores')
        this.$q.localStorage.set('vendedores', serverData)
      }
    },
    async getProductos () {
      const resp = await productosLib.listar(null)
      const serverData = []
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
        serverData.push(obj)
      }
      this.$q.localStorage.remove('productos')
      this.$q.localStorage.set('productos', serverData)
    },
    async getCxc () {
      const serverData = []
      console.log(this.usuario, this.idrol)
      const resp = await clientesLib.getcxc(this.usuario, this.idrol)
      console.log(resp)
      const datos = resp.data
      for (const i in datos) {
        const item = datos[i]
        const obj2 = {}
        obj2.id = item.id
        obj2.tipodoc = item.tipodoc
        obj2.fecha = moment(item.fecha).format('YYYY-MM-DD')
        obj2.dias = this.calcDiffHours(item.fecha)
        obj2.monto = '$' + item.monto.toFixed(2)
        obj2.saldo = '$' + item.saldo.toFixed(2)
        const index = serverData.findIndex(obj => obj.idcliente === item.idcliente)
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
          obj.cantidadcxc = 1
          obj.details.push(obj2)
          serverData.push(obj)
        } else {
          serverData[index].totalcxc += parseFloat(item.saldo)
          serverData[index].details.push(obj2)
          serverData[index].cantidadcxc += parseInt(1)
        }
      }
      this.$q.localStorage.remove('cuentasxc')
      this.$q.localStorage.set('cuentasxc', serverData)
    },
    calcDiffHours (fecha) {
      const now = moment()
      const end = moment(fecha, 'YYYY-MM-DD')
      // console.log(now, end)
      const duration = moment.duration(now.diff(end))
      return duration.asDays().toFixed(0)
    },
    falloCallback () {
      console.log('Error sincronizando')
    },
    async setPedidos () {
      const holds = this.$q.localStorage.getItem('holds')
      const itemspedido = this.$q.localStorage.getItem('itemsholds')
      const pedidos = holds.filter(obj => obj.status === 3)
      console.log(pedidos)
      for (const i in pedidos) {
        const item = pedidos[i]
        const idcliente = item.idcliente
        const idusuario = this.idusuario
        const usuario = this.usuario
        const idsucursal = this.idsucursal
        const nombrecliente = item.nombrecliente
        const rifcliente = item.rifcliente
        const totalcarrito = item.subtotal
        const arregloOriginal = itemspedido.filter(obj => obj.indice === item.indice)
        console.log(arregloOriginal)
        const arregloDeArreglos = []
        // console.log('Arreglo original: ', arregloOriginal)
        const LONGITUD_PEDAZOS = 13
        for (let i = 0; i < arregloOriginal.length; i += LONGITUD_PEDAZOS) {
          const pedazo = arregloOriginal.slice(i, i + LONGITUD_PEDAZOS)
          arregloDeArreglos.push(pedazo)
        }
        // console.log('Arreglo de arreglos: ', arregloDeArreglos)
        this.loader = true
        for (const i in arregloDeArreglos) {
          const arreglopedido = arregloDeArreglos[i]
          // console.log(arreglopedido)
          console.log(idusuario, usuario, idcliente, nombrecliente, rifcliente, totalcarrito, idsucursal, arreglopedido)
          // await pedidosLib.setpedido(idusuario, this.usuario, idcliente, nombrecliente, rifcliente, totalcarrito, idsucursal, arreglopedido)
        }
      }
    },
    setSincronized () {
      this.setPedidos()
    },
    getSincronized () {
      this.loader = true
      this.setPedidos().then(
        this.getProductos()
      ).then(
        this.getUsuarios()
      ).then(
        this.getVendedores()
      ).then(
        this.getCxc()
      ).then(
        this.getHolds()
      ).then(
        this.getItemsHolds()
      ).then(
        this.getClientes().then(() => {
          console.log('Sincronizado finalizó sin problema')
          this.loader = false
        })
      ).catch(this.falloCallback)
      this.feultget = moment().format('YYYY-MM-DD HH:mm:ss')
      this.$q.localStorage.remove('feultget')
      this.$q.localStorage.set('feultget', this.feultget)
      // const feultgetId = document.querySelector('#feultgetId')
      // feultgetId.textContent = this.feultget
      // this.$router.go(0)
    }
  },
  mounted () {
    console.log('Main Layout offline')
    if (this.$q.localStorage.getItem('feultget') === 'null') {
      console.log('Aqui 1')
    }
    this.feultget = this.$q.localStorage.getItem('feultget') !== 'null' ? this.$q.localStorage.getItem('feultget') : 'S/Inf'
    console.log(this.feultget)
    console.log(this.usuario)
    // const resp = pedidosLib.corregirClientesNull()
    // console.log(resp)
  }
})
</script>
<style scoped>
  .headerItem{
    margin: 30px;
    display: flex;
    align-items: center;
  }
  .menuitem {
    height: 86px;
    width: 27%;
    border: 1px solid green;
    border-radius: 12px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: bold;
    margin: 9px;
    padding-top: 5PX;
    line-height: 12px;
  }
  .subHeaderItem{
    text-align: center;
    width: 100%;
    font-size: x-large;
  }
  .iconApp{
    font-size: 50px;
  }
  .procesando {
    background: #3a4142cc;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99999;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: white;
  }
</style>
