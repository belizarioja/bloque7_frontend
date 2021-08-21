<template>
  <div class="bg-transparent">
    <div class="bannerlogin">
      <img src="../assets/logobloque7.png" height="140"/>
    </div>
  </div>
  <div class="q-pa-md text-dark bg-secondary formLogin">
    <form
      @submit="enviarLogin">
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
      <div
        style="margin:40px 0 30px;"
        class="text-center"
        to="/recover">
         Olvidó su clave?
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
/// import moment from 'moment'

export default defineComponent({
  setup () {
    return {
      usuario: ref(''),
      clave: ref(''),
      mantener: false
    }
  },
  methods: {
    async enviarLogin () {
      try {
        console.log(this.usuario)
        console.log(this.clave)
        const resp = await auth.login(this.usuario, this.clave)
        console.log(resp)
        if (resp.data.status === 400) {
          this.$q.dialog({
            title: 'Advertencia!',
            message: resp.data.message,
            cancel: true,
            persistent: true
          })
          // const idusuario = resp.data.resp[0].id
          // console.log()
          console.log(resp.data)
          // this.$q.localStorage.set('usuario', this.usuario)
          // this.$q.localStorage.set('idusuario', idusuario)
          // const resp4 = await asistencia.sincronizar(this.unidades)
          // console.log(resp4)
          // mysql -u usuario -p appbloque7 < 'numerixfw.sql';
        } else {
          if (resp.data.length > 0) {
            this.$router.push('/index')
          } else {
            this.$q.dialog({
              title: 'Advertencia!',
              message: 'Credenciales no válidas',
              cancel: true,
              persistent: true
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
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
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .formLogin {
    border-radius: 10px 10px 0px 0px;
    padding: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
