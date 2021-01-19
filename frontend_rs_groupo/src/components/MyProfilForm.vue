<template>
<div id="user">
    <h3 class="manager-title font-italic">Mon profil...</h3>
    <md-table >
      <md-table-row >
        <md-table-cell md-label="first_name" md-sort-by="first_name"><span>First name:</span> {{ user.first_name }}</md-table-cell>
        <md-table-cell md-label="last_name" md-sort-by="last_name"><span>Last name:</span> {{ user.last_name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email"><span>Email:</span> {{ user.email }}</md-table-cell>  
      </md-table-row>   
    </md-table>           
</div>
</template>

<script>
export default {
    name: 'MyProfil',
   data () {
        return{      
        user:'',
        first_name: '',
        last_name: '',
        email: ''      
            }
        },
    mounted(){         
      //Obtenir mon profil
      fetch("http://localhost:3000/api/auth/userInfo/" + localStorage.getItem('email'),  {
          method: 'GET',
             headers: {
                 //  'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')   
            }})
    .then (response => response.json())

     .then(data=>this.user = data)
    }
  }

</script>

<style scoped lang="scss">
span{   
    color:rgb(173, 29, 29);
}

.md-table{
    margin-bottom: 250px;
    margin-top: 250px;
}
</style>