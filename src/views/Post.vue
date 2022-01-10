<template>
  <div class="centrado" id="Post">    
    <v-container class="filtro mb-6" > 
      <v-btn text @click= "deslog" class="botngresar2" id="botoncitox" v-model="botoncito">
        Deslogear
      </v-btn>       
      <v-combobox
        v-model="select"
        :items="items"
        label="Aplicar filtros:"
        placeholder="Ningún filtro"
        >
      </v-combobox>
    </v-container>
    <div class="post" v-for="post in posts" :key="post.id">              
      <v-container class="centrado mb-6" >        
        <v-row class="centrado mb-6" >        
          <v-col>
            <v-card class="mx-auto">
              <v-img
                class="white--text align-end"
                height="200px"
              :src="`https://picsum.photos/id/${post.id}/300/200`"
              >            
              <v-card-title>{{post.title}}</v-card-title>
            </v-img>
          <div class="centrado">            
            <h3 class="price">$ {{ new Intl.NumberFormat().format(post.amount) }}</h3>
          </div>
          <v-card-text class="text--primary">  
            <div class="posteo">{{post.body}}</div>      
          </v-card-text>
          <v-card-actions class="centrado2">             
            <div>
              <v-row justify="center">
                <v-btn
                      class="Otravista"          
                      color="orange"
                      small 
                      dark
                      @click="detallePost(post)"         
                      
                    >
                    Mas...                      
                    </v-btn>
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
import Vue from 'vue';


export default {
  name:'Post',
  data() {
    return {
      select: '',
      posts: [],
      auxPosts:[],      
      items: [
        'Montos menores que $5.000.000',
        'Montos mayores que $5.000.000 hasta $10.000.000',
        'Ningún filtro',
      ]
    }
  },
 
  watch:{
    select:function(value){
      if(value=='Montos menores que $5.000.000'){
        this.menores();
      }
      else if (value=='Montos mayores que $5.000.000 hasta $10.000.000') {
        this.mayores();
      }
      else{
        this.nada();
      }
    }
  },
  computed: {
    text() {
      return this.posts
    }
  },
  methods:{
    postdet(){
      this.posts

    },
    detallePost(elemento){
      this.$router.push({name: 'Detallepost', params: {elemento: elemento}})
    },
    deslog(){
        localStorage.clear();
        this.$router.push(`/`)
        
    },
    mayores(){
      this.posts = [];
      this.auxPosts.map((obj) => {
        if(obj.amount >= 5000000 && obj.amount <= 10000000){
          this.posts.push(obj)          
        }
      });
    },
    menores(){
      this.posts = [];
      this.auxPosts.map((obj) => {
        if(obj.amount >= 1 && obj.amount <= 4999999){
          this.posts.push(obj)  
        }
      });
    },
    nada(){
      this.posts=this.auxPosts
    },
  },    
  beforeMount(){
  },
  mounted(){
    axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then(response=>{ 
      response.data.map((obj) => {
        obj.status = Math.floor((Math.random() * (1 - 0 + 1)) + 0)
        obj.amount = Math.floor(Math.random() * 15000000)
        if(obj.status != 0){
          this.posts.push(obj)
          this.auxPosts.push(obj)
          Vue.prototype.$array=this.posts
        }
      });
    })
  }
}    
</script>
