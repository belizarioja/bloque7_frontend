<template>
  <q-page class="text-center">
    <div class="headerItem">
      <div class="subHeaderItem">
        Aplicativos
      </div>
    </div>
    <q-card class="my-card" style="margin: 20px;">
      <q-card-section style="display: flex;">
        <div
          class="menuitem"
          @click="gotoClientes()">
          <q-icon class="iconApp" name="playlist_add" color="info" />
          <div class="tituloApp">PEDIDOS</div>
        </div>
        <div
          class="menuitem"
          @click="gotoVendedores()">
          <q-icon class="iconApp" name="manage_accounts" color="accent" />
          <div class="tituloApp">VENDEDORES</div>
        </div>
        <div
          class="menuitem">
          <q-icon class="iconApp" name="paid" color="warning" />
          <div class="tituloApp">CTAS X COBRAR</div>
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
    height: 70px;
    width: 25%;
    border: 1px solid green;
    border-radius: 12px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: x-small;
    float: left;
    margin: 10px;
  }
  .subHeaderItem{
    text-align: center;
    width: 100%;
    font-size: x-large;
  }
  .iconApp{
    font-size: xxx-large;
  }
</style>
