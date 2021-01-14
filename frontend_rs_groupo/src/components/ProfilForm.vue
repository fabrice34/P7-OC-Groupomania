<template>
<div id="user">
    <h3 class="manager-title font-italic">liste des users...</h3>

    <md-table v-for="(user, id) in users" v-bind:key="id" md-card>
      <md-table-row >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ user.id }}</md-table-cell>
        <md-table-cell md-label="first_name" md-sort-by="first_name">{{ user.first_name }}</md-table-cell>
        <md-table-cell md-label="last_name" md-sort-by="last_name">{{ user.last_name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ user.email }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{ user.created_date }}</md-table-cell>
       
        <md-card-actions>
          <md-button type="submit" class="md-primary"  v-on:click.prevent="deleteUser(user.id)">Suprimer profil</md-button>
        </md-card-actions>
      </md-table-row>   
    </md-table>

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



</style>