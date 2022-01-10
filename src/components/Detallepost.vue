<template>
<div class="centrado" id="Post" style="width: 100%">    
    <v-container class="filtro mb-6" > 
      <v-btn text @click= "volver" class="botngresar2" id="botoncitox" v-model="botoncito">
        Volver
      </v-btn> 
    </v-container>
    <div class="postdetalle">              
      <v-container class="centrado mb-6" >        
        <v-row class="centrado mb-6" >        
          <v-col 
          cols="12"
            sm="12"
            md="5">
            <v-card style="whidth: 100%">
              <v-img
                class="white--text align-end"                
              :src="`https://picsum.photos/id/${elemento.id}/300/200`"
              >            
              <v-card-title>{{elemento.title}}</v-card-title>
            </v-img>
          <div class="centrado pt-3">            
            <h3 class="price">$ {{ new Intl.NumberFormat().format(elemento.amount) }}</h3>
          </div>
          <v-card-text class="text--primary">  
            <div class="posteo">{{elemento.body}}</div>      
          </v-card-text>
          <v-card-actions class="centrado2">             
            <div>
              <v-row justify="center">
                <v-dialog                
                  v-model="dialog"
                  width="700px"
                  height="1000px"                  
                > 
                </v-dialog>
              </v-row>
            </div>    
          </v-card-actions>
            </v-card>          
          </v-col>
        </v-row>
      </v-container>    
    </div>
    <detalle v-bind="auxPosts"></detalle>        
  </div>  
</template>
<script>
import axios from 'axios'
export default {
    name: 'detallepost',
    components:{
    },
    data() {
        return {
         detalle:[],
         elemento:{},
         imagen:''
        }
    },


    methods: {
      volver() {
        this.$router.go(-1)
        
      }
    },
    mounted(){
    window.scrollTo(0,0)  
    if(!this.$route.params.elemento){
      this.$router.push('/post')
    }
    this.elemento = this.$route.params.elemento
      

    axios.get(`https://jsonplaceholder.typicode.com/posts/${this.elemento.id}`)
    .then(response=>{       
      this.detalle = response.data
    })

  }
}
</script>