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
            v-for="row in rows"
            :key="row.id">
            <q-item-section>
              <q-item-label>{{row.Nom_Producto}}</q-item-label>
              <q-item-label caption>{{row.Cod_Producto}} Precio ${{row.P_dollar}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
const rows = [
  {
    id: 1,
    Nom_Producto: 'CHUPETAS MAXXI FRESA 1X24',
    Cod_Producto: 'P410',
    P_dollar: 1.99
  },
  {
    id: 2,
    Nom_Producto: 'MERMELADA GUAYABA CAJA 1X20 KG',
    Cod_Producto: 'M0019',
    P_dollar: 42.99
  },
  {
    id: 3,
    Nom_Producto: 'QUESO PARMESANO RALLADO DOÑA FLORA',
    Cod_Producto: 'M450',
    P_dollar: 21.99
  },
  {
    id: 4,
    Nom_Producto: 'PUDIN DE VAINILLA 5 KG CONDIBLUE',
    Cod_Producto: 'PUD52',
    P_dollar: 21.90
  }
]

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    return {
      rows
    }
  },
  methods: {
    gotoCategorias () {
      this.$router.push('/categorias')
    }
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
