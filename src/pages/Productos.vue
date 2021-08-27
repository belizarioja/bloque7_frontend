<template>
  <q-page class="text-center">
    <div class="headerItem">
       <div
          class="menuitem"
          @click="gotoCategorias()">
          <q-icon name="keyboard_return" color="info" />
        </div>
        <div class="subHeaderItem">
          Productos
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
            <q-item-section>
              <div style="display:grid;">
                <div>
                  {{row.nombre}}
                </div>
                <div  style="display:flex;">
                  <div style="padding: 10px;">
                    <img src="../assets/default.svg" height="40"/>
                  </div>
                  <div style="display:grid;">
                    <div>
                      {{row.codigo}} {{row.marca}}
                    </div>
                    <div>
                      Precio $ {{row.precio}}
                    </div>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import productosLib from '../logic/productos'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      serverData: []
    }
  },
  methods: {
    gotoCategorias () {
      this.$router.push('/categorias')
    },
    async listarProductos (categoria) {
      const resp2 = await productosLib.listar(categoria)
      this.serverData = []
      const datos = resp2.data
      console.log(datos)
      for (const i in datos) {
        const item = datos[i]
        // console.log(item)
        const obj = {}
        obj.id = item.id
        obj.nombre = item.Nom_Producto
        obj.codigo = item.Cod_Producto
        obj.precio = item.P_Dollar
        obj.marca = item.Marca
        this.serverData.push(obj)
      }
      console.log(this.serverData)
    }
  },
  mounted () {
    this.idusuario = this.$q.localStorage.getItem('idusuario')
    const categoria = this.$q.localStorage.getItem('categoria')
    console.log(this.idusuario)
    this.listarProductos(categoria)
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
