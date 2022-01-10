<template>
  <v-app id="inspire">
    <v-app-bar app>

      <v-toolbar-title class="titulo">Bienvenido <span class="text-capitalize">{{user.nombre}} {{user.app_pat}}</span></v-toolbar-title>      
    </v-app-bar>
    <v-main class="fondo"> 
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'

  export default {
    
    data() {
        return {             
        user:'' 
        }
      },
    components:{
      ...mapState(['user'])
    },
    methods: {
    },
    beforeMount(){
                  
    },
  }
</script>
