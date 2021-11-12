<template>
  <q-page class="text-center">
    <div class="headerItem">
      <div class="subHeaderItem">
        Aplicativos
      </div>
    </div>
    <q-card class="my-card" style="margin: 20px;">
      <q-card-section style="display: flex; padding: 7px;">
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
      <q-card-section style="display: flex; padding: 7px;">
        <div
          class="menuitem"
          @click="gotoUsuarios()">
          <q-icon class="iconApp" name="account_circle" color="secondary" />
          <div class="tituloApp">USUARIOS</div>
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
    },
    gotoUsuarios () {
      this.$router.push('/usuarios')
    },
    gotoVendedores () {
      this.$router.push('/vendedores')
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
    height: 80px;
    width: 27%;
    border: 1px solid green;
    border-radius: 12px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: xx-small;
    float: left;
    margin: 9px;
    padding-top: 5PX;
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
