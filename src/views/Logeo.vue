<template>
  <div class="Center">
    <v-container class="mb-6">
      <v-row>
        <v-col>
          <v-card class="mx-auto my-12" max-width="374">
            <div class="pa-5">
              <v-img class="white--text align-end" height="100px" src="https://redcapital.cl/images/logo-redcapital-head.png"></v-img>
            </div>
            <v-card-title class="sesion">Inicio de Sesión</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <div style="width: 100%">
                  <v-text-field	class="tlog"
                    label="Ingrese su rut" 
                    placeholder="11.111.111-1"
                    v-model="usuario"
					@keyup="formatRut"
                    @change="validarRut"
                  ></v-text-field>
                  <v-text-field	class="tlog" 
                    label="Contraseña" 
                    type="Password"
                    v-model="password"
                  ></v-text-field>                  
                </div>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="login" class="botngresar">
                ingresar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const axios = require('axios'); import { mapActions } from 'vuex'
import {format, validate} from 'rut.js';
 
export default {
  data() {
    return {
      usuario:null,
      password: null,
	}
  },
  computed:{
  },  
  methods:{
    ...mapActions(['setterUser']),
    async login(){
      await axios.post('https://crm.redcapital.cl/api/login', { 
        "rut": this.usuario,
        "password": this.password,
        "remember_me": 1
      })
      .then( (response)=> {
        if(response.data.data.usuario){
          this.setterUser(response.data.data.usuario)
			if(response.status == 200){
			this.$router.push('/Post/')
			}
        }         
      })
      .catch(function () {
        alert("Error al iniciar sesión, por favor, reintente");
      });     
    },
		formatRut(){
            if(this.usuario === '')
            this.usuario = ''
            else
               this.usuario = format(this.usuario);
         },
    validarRut(e){
        if(e != '' && !validate(this.usuario)){
            this.mensajeAlerta = 'Rut no valido';
            this.countDownChanged(2);
            }
         },
  },  
}    
</script>

<style lang="scss" scoped>
</style>
