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
            v-for="row in rows"
            :key="row.id">
            <q-item-section
              @click="gotoProductos()">
              <q-item-label>{{row.Nom_Producto}}</q-item-label>
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
    Nom_Producto: 'LENCERIA'
  },
  {
    id: 2,
    Nom_Producto: 'CHARCUTERIA'
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
    gotoProductos () {
      this.$router.push('/productos')
    },
    gotoClientes () {
      this.$router.push('/clientes')
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
