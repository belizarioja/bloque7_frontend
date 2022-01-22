<template>
  <div class="bg-transparent text-center"  style="padding-top: 75px;">
    <span style="font-size:x-large"> Enhorabuena!</span>
    <p>Gracias por usar nuestra App!</p>
    <div class="bannerlogout">
      <img src="../assets/logobloque7.png" height="115"/>
    </div>
    <div class="text-center"  style="margin:20px;">
      <q-btn
        label="Ir a Login"
        type="buttom"
        color="dark"
        @click="gotoIndex()"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
/// import moment from 'moment'

export default defineComponent({
  methods: {
    gotoIndex () {
      this.$router.push('/')
    }
  },
  created () {
    console.log(this.$q.localStorage.getItem('mantener'))
    this.$q.localStorage.set('salida', true)
    if (!this.$q.localStorage.getItem('mantener')) {
      this.$q.localStorage.clear()
    } else {
      this.gotoIndex()
    }
  }
})
</script>

<style lang="scss">
  .bannerlogout{
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
