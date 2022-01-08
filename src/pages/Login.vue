<template>
  <div class="bg-transparent">
    <div class="bannerlogin">
      <img src="../assets/logobloque7.png" height="115"/>
    </div>
  </div>
  <div class="q-pa-md text-dark bg-secondary formLogin">
    <form
      @submit.prevent="enviarLogin">
      <div class="text-weight-bold text-center text-dark" style="height:40px;">LOGIN</div>
      <q-input
        borderless
        standout
        dense
        class="login bg-white"
        label-color="dark"
        v-model="usuario"
        label="Usuario"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese usuario']">
        <template v-slot:prepend>
          <q-icon name="account_box" color="dark" />
        </template>
      </q-input>
      <q-input
        borderless
        standout
        dense
        class="login bg-white"
        color="dark"
        label-color="dark"
        v-model="clave"
        type="password"
        label="Contraseña"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por favor ingrese contraseña'
        ]">
          <template v-slot:prepend>
            <q-icon name="lock" color="dark" />
          </template>
      </q-input>
      <div class="q-gutter-sm">
        <q-checkbox v-model="mantener" label="Guardar acceso" />
      </div>
      <div class="text-center"  style="margin-bottom:20px;">
        <q-btn
          style="width: -webkit-fill-available;"
          label="Login"
          type="submit"
          color="dark"/>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import auth from '../logic/auth'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH = config.endpoint_path

export default defineComponent({
  setup () {
    const imei = ref(
      window.device === void 0
        ? '11111111111111111111'
        : window.device.uuid
    )
    return {
      imei,
      usuario: ref(''),
      clave: ref(''),
      mantener: ref(false)
    }
  },
  methods: {
    async enviarLogin () {
      try {
        // console.log(this.usuario)
        // console.log(this.clave)
        console.log(this.mantener)
        // alert(this.mantener)
        const resp = await auth.login(this.usuario, this.clave, this.imei)
        // console.log(resp)
        if (resp.data.status === 500) {
          // SI HAY ALGUN ERROR EN LAS CONSULTAS
          this.$q.dialog({
            title: 'Advertencia!',
            message: resp.data.message,
            cancel: true,
            persistent: true
          })
        } else {
          if (resp.data.length > 0) {
            // SI LAS CREDENCIALES SON VALIDAS
            const idusuario = resp.data[0].id
            const nombreusuario = resp.data[0].nombre
            const idrol = resp.data[0].idrol
            const idsucursal = resp.data[0].idsucursal
            const status = resp.data[0].status
            // console.log(resp.data)
            if (status === 1) {
              this.$q.localStorage.set('usuario', this.usuario)
              this.$q.localStorage.set('clave', this.clave)
              this.$q.localStorage.set('nombreusuario', nombreusuario)
              this.$q.localStorage.set('idusuario', idusuario)
              this.$q.localStorage.set('idrol', idrol)
              this.$q.localStorage.set('idsucursal', idsucursal)
              this.$q.localStorage.set('mantener', this.mantener)
              this.$q.localStorage.set('salida', false)
              this.$router.push('/index')
            } else {
              this.$q.dialog({
                title: 'Oops! No tiene acceso!',
                message: 'Contacte a la adminstración de BLOQUE 7!',
                persistent: true
              })
            }
          } else {
            // SI LAS CREDENCIALES NO SON VALIDAS
            this.$q.dialog({
              title: 'Oops! Advertencia!',
              message: 'Credenciales no válidas!',
              cancel: true,
              persistent: true
            })
          }
        }
      } catch (error) {
        // console.log(error)
        this.$q.dialog({
          title: 'Oops! Problemas con INTERNET',
          message: 'Revise conexión e intente ingresar de nuevo!',
          persistent: true
        })
      }
    }
  },
  created () {
    // this.showMacAddress()
    if (this.$q.localStorage.getItem('mantener')) {
      this.mantener = this.$q.localStorage.getItem('mantener')
      this.usuario = this.$q.localStorage.getItem('usuario')
      this.clave = this.$q.localStorage.getItem('clave')
      if (!this.$q.localStorage.getItem('salida')) {
        // console.log('Entrar sin logueo de una :', this.salida)
        this.$router.push('/index')
      }
    } else {
      this.mantener = false
    }
    console.log(this.mantener)
    console.log(this.imei)
    const cadena = ENDPOINT_PATH
    const request = new XMLHttpRequest()
    try {
      request.open('GET', cadena, false)
      request.send()
    } catch (error) {
      this.$q.dialog({
        title: 'Oops! Problemas con INTERNET',
        message: 'Revise conexión e intente ingresar de nuevo!',
        persistent: true
      })
    }
  }
})
</script>
<style lang="scss">
  .login {
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 0 10px;
  }
  .q-btn {
    text-transform: inherit;
    border-radius: 5px;
  }
  .q-field--with-bottom {
    padding-bottom: 0;
  }
  .testbox {
    margin: 20px auto;
    -webkit-border-radius: 8px/7px;
    -moz-border-radius: 8px/7px;
    border-radius: 8px/7px;
    background-color: #ebebeb;
    -webkit-box-shadow: 1px 2px 5px rgba(0,0,0,.31);
    -moz-box-shadow: 1px 2px 5px rgba(0,0,0,.31);
    box-shadow: 1px 2px 5px rgba(0,0,0,.31);
    border: solid 1px #cbc9c9;
  }
  .bannerlogin{
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .formLogin {
    border-radius: 10px 10px 0 0;
    padding: 20px;
    position: absolute;
    top: 120px;
    left: 0;
    right: 0;
    height: 100%;
  }
</style>
