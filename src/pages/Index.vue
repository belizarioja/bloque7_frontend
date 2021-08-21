<template>
  <q-page class="text-center">
    <div style="margin:20px;">
      Aplicativos
    </div>
    <q-card class="my-card" style="margin: 20px;">
      <q-card-section>
        <div
          class="menuitem"
          @click="gotoProductos()">
          <q-icon name="inventory_2" color="info" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  methods: {
    gotoProductos () {
      this.$router.push('/clientes')
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
