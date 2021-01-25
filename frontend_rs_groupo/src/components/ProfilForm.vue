<template>
<div id="user">
    <h3 class="manager-title font-italic">liste des users...</h3>

    <div class="listuser" v-for="(user, id) in users" v-bind:key="id" >  
        <div class="a">{{ user.first_name }}</div>
        <div class="a">{{ user.last_name }}</div>
        <div class="a">{{ user.email }}</div>
        <div class="a">{{ user.created_date }}</div>  
        <md-button type="submit" class="md-primary"  v-on:click.prevent="deleteUser(user.id)">Suprimer profil</md-button>      
    </div>

</div>
</template>

<script>
export default {
    name: 'Profil',
    data () {
        return{
             users: [],
             idUser: '',            
            }
        },
    mounted(){
         
      //Obtenir tous les users
      fetch("http://localhost:3000/api/auth/usersInfo",  {
          method: 'GET',
             headers: {
                 //  'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
            }})
      .then (response => response.json())
     .then(data=>this.users = data)

    }, 

    methods: {

           deleteUser(id) {
        
            async function userForm() {
    try {
        let response = await fetch("http://localhost:3000/api/auth/delete/" + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
            }
        });
        if (response.ok) {
            let responseId = await response.json();
            console.log(responseId)
            location.reload();
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
userForm();
   }
  }
}
</script>

<style scoped lang="scss">
.md-primary{
    background-color: #fa0808;
    color:#fff;
    font-weight: bold;
}
.a{
    
    font-weight: bold;
}
.listuser{
    margin-bottom: 100px;
    margin-top: 100px;
}



</style>