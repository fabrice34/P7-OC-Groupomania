<template>
<div class="formulaire">
     <form novalidate class="md-layout" >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-content>
           <md-field>
            <label for="first_name"> {{ user.first_name }}</label>
            <md-input type="first_name" name="first_name" id="first_name" autocomplete="given-first_name" v-model="first_name"  />   
           </md-field>
           <md-field>
                <label for="last_name"> {{ user.last_name }}</label>
                <md-input name="last_name" id="last_name" autocomplete="given-last_name" v-model="last_name"  />
           </md-field>
        </md-card-content>
      
        <md-card-actions>
            <md-button type="submit" class="md-primary"  v-on:click.prevent="updateUser">modifer user</md-button>
        </md-card-actions>
      </md-card>    
    </form>
</div>
</template>



<script>
export default {
    name: 'UserUpdateForm',
    data() { return {
        user:'',
        first_name: '',
        last_name: '',
        id:''
        }
    },
    beforeMount(){    
      //Obtenir mon user
      fetch("http://localhost:3000/api/auth/userInfo/" + localStorage.getItem('email'),  {
          method: 'GET',
             headers: {
                 //  'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')   
            }})
    .then (response => response.json())

     .then(data=>this.user = data)
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
     .then(data=>{
             this.first_name = data.first_name,
             this.last_name = data.last_name,
             this.id = data.id 
}
)
    }
    ,
   methods: {
        updateUser(){
            let dataForm = JSON.stringify({first_name: this.first_name, last_name: this.last_name,id: this.id  });
            
            async function signUp(dataForm) {
                try {
                let response = await fetch("http://localhost:3000/api/auth/" + localStorage.getItem('Id'), {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: dataForm,
                });
                     if (response.ok) {
                            let responseId = await response.json();
                           // window.location.href = " http://localhost:8080/signup#/profil";
                            console.log(responseId);
                        } else {
                            console.error('Retour du serveur : ', response.status);
                        }
                } catch (e) {
                console.log(e);
                }
            }
            signUp(dataForm)
            window.location.href = "http://localhost:8080/signup#/login";
           
            
        }
    }
    }
</script>



<style scoped lang="scss">
.md-primary{
    background-color: #cab707;
    color:#fff;
    font-weight: bold;
}
form{
    margin-bottom: 70px;
    margin-top: 50px;
    width:200%;
}
.md-layout{
    margin-bottom: 150px;
    margin-top: 150px;
}

@media all and (max-width: 899px)
{
   form{
   
    width:100%;
} 
}


</style>