<template>
  <q-page class="text-center">
    <div style="margin:20px;">
      Catálogo de categorias
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
    }
  }
})
</script>
<style scoped>
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
</style>
