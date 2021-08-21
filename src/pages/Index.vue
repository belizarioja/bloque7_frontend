<template>
  <q-page class="text-center">
    <div class="headerItem">
      <div class="subHeaderItem">
        Aplicativos
      </div>
    </div>
    <q-card class="my-card" style="margin: 20px;">
      <q-card-section>
        <div
          class="menuitem"
          @click="gotoClientes()">
          <q-icon name="playlist_add" color="info" />
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
    gotoClientes () {
      this.$router.push('/clientes')
    }
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
