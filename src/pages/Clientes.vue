<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoIndex()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Cartera de clientes
        </div>
    </div>
    <q-card class="my-card" style="margin: 10px;">
      <q-card-section style="padding: 10px;">
        <q-list bordered separator class="text-left">
          <q-item
            clickable
            v-ripple
            v-for="row in serverData"
            :key="row.id"
            :class="{'done' : row.chk }">
            <q-item-section
              @click="gotoCategorias( row.id, row.nombre )">
              <q-item-label>{{row.nombre}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import clientesLib from '../logic/clientes'

export default defineComponent({
  name: 'Clientes',
  data () {
    return {
      serverData: []
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
      const resp2 = await clientesLib.listar()
      console.log(resp2)
      const datos = resp2.data
      for (const i in datos) {
        const item = datos[i]
        const obj = {}
        obj.id = item.id
        obj.nombre = item.Nom_Cliente
        obj.rif = item.ced_cliente
        obj.chk = false
        // console.log(chk, item.id)
        if (chk === item.id) {
          obj.chk = true
        }
        this.serverData.push(obj)
      }
    }
  },
  mounted () {
    this.idusuario = this.$q.localStorage.getItem('idusuario')
    console.log(this.idusuario)
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
    font-size: x-large;
  }
  .done{
    background: aquamarine;
  }
</style>
