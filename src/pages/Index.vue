<template>
  <q-page class="text-center">
    <div class="headerItem">
      <div class="subHeaderItem">
        Módulos
      </div>
    </div>
    <q-card class="my-card" style="margin: 20px;">
      <q-card-section style="display: flex; padding: 7px;">
        <div
          class="menuitem"
          @click="gotoClientes()">
          <q-icon class="iconApp" name="point_of_sale" color="info" />
          <div class="tituloApp">PEDIDOS</div>
        </div>
        <div
          class="menuitem"
           v-show="idrol === 1"
          @click="gotoVendedores()">
          <q-icon class="iconApp" name="manage_accounts" color="accent" />
          <div class="tituloApp">VENDEDORES</div>
        </div>
        <div
          class="menuitem"
          @click="gotoCxc()">
          <q-icon class="iconApp" name="paid" color="warning" />
          <div class="tituloApp">CTAS X COBRAR</div>
        </div>
        <div
          class="menuitem"
          v-show="idrol > 1"
          @click="gotoReportePedidos()">
          <q-icon class="iconApp" name="view_list" color="primary" />
          <div class="tituloApp">REPORTE</div>
        </div>
      </q-card-section>
      <q-card-section style="display: flex; padding: 7px;">
        <div
          class="menuitem"
          v-show="idrol === 1"
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
  data () {
    return {
      idrol: this.$q.localStorage.getItem('idrol')
    }
  },
  methods: {
    gotoClientes () {
      this.$router.push('/clientes')
    },
    gotoUsuarios () {
      this.$router.push('/usuarios')
    },
    gotoVendedores () {
      this.$router.push('/vendedores')
    },
    gotoCxc () {
      this.$router.push('/cuentasxcobrar')
    },
    gotoReportePedidos () {
      this.$router.push('/reportepedidos')
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
    height: 90px;
    width: 27%;
    border: 1px solid green;
    border-radius: 12px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    float: left;
    margin: 9px;
    padding-top: 5PX;
    line-height: 12px;
  }
  .subHeaderItem{
    text-align: center;
    width: 100%;
    font-size: x-large;
  }
  .iconApp{
    font-size: 50px;
  }
</style>
