<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoClientes()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Categorías
        </div>
    </div>
    <q-card class="my-card" style="margin: 10px;">
      <q-card-section style="padding: 10px;">
        <q-list bordered separator class="text-left">
          <q-item
            clickable
            v-ripple
            v-for="row in serverData"
            :key="row.id">
            <q-item-section
              @click="gotoProductos( row.categoria )">
              <q-item-label>{{row.categoria}} {{row.nombre}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import categoriasLib from '../logic/categorias'

export default defineComponent({
  name: 'Categorias',
  data () {
    return {
      serverData: []
    }
  },
  methods: {
    gotoProductos (categoria) {
      this.$q.localStorage.set('categoria', categoria)
      this.$router.push('/productos')
    },
    gotoClientes () {
      this.$router.push('/clientes')
    },
    async listarCategorias () {
      const resp2 = await categoriasLib.listar()
      this.serverData = []
      const datos = resp2.data
      // console.log(datos)
      for (const i in datos) {
        const item = datos[i]
        // console.log(item)
        const obj = {}
        obj.id = item.id
        obj.nombre = item.Nom_Grupo
        obj.categoria = item.Cod_Grupo
        this.serverData.push(obj)
      }
    }
  },
  mounted () {
    this.idusuario = this.$q.localStorage.getItem('idusuario')
    console.log(this.idusuario)
    this.listarCategorias()
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
</style>
