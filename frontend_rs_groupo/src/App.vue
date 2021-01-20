<template>
  <div id="app">
    <header>
      <Header/>
      <div class="menu"> 
        <md-tabs class="md-primary" md-alignment="centered">  
         <md-tab id="tab-Home" md-label="Home"><router-link to="/allpost">All post</router-link></md-tab>      
          <md-tab id="tab-create" md-label="create"><router-link to="/create">Create post</router-link></md-tab>
          <md-tab id="tab-Users" md-label="Users"><router-link to="/profil">All profil</router-link></md-tab>
          <md-tab id="tab-my profil" md-label="My profil"><router-link to="/myprofil">My profil</router-link></md-tab>
          <md-tab id="tab-Update User" md-label="Update User"> <router-link to="/updateuserform">Update Profil</router-link></md-tab>
          <md-tab id="tab-exit" md-label="exit"><a href="#" v-on:click="exitUser">EXIT</a> </md-tab>        
        </md-tabs>
      </div> 
      
    </header>

    <body class="bg-body">
       <div class="connect" v-if =" id === null " >
          <router-link to="/signup">Inscription</router-link> ||
          <router-link to="/login">Connexion</router-link>
       </div>
       <router-view/>
    </body>

    <footer>
      <Footer/>
    </footer>

  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
     },
  data(){
    return {
      id: ''
    }
  },
  mounted() {
    let idUser = localStorage.getItem('Id');
    console.log(idUser);
    this.id = idUser;
  },
  methods: {
    exitUser (){
       localStorage.removeItem('Id');
       localStorage.removeItem('token');
       localStorage.removeItem('email');
       location.replace(location.origin + "/signup#/signup");
       location.reload();
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.connect{margin-bottom: 40px;
margin-top: 200px;}
 @media all and (max-width: 599px)
 {
.bg-body{
margin-bottom: 100px;
}

}

</style>
