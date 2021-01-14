<template>
 <div>
    <form novalidate class="md-layout" >
      <md-card class="md-layout-item md-size-50 md-small-size-100">

        <md-card-content>
          <md-field>
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="email"  />           
          </md-field>
          
          <md-field>
                <label for="password">Password</label>
                <md-input name="password" type="password" id="password" autocomplete="given-password" v-model="password"  />               
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary"  v-on:click.prevent="loginUser">Login</md-button>
        </md-card-actions>
      </md-card>     
    </form>
  </div>

</template>

<script> 
export default {
    name: 'ConnexionForm',
    data () {
        return{
            email: '',
            password: ''
            }
        },
        
    methods:{
           loginUser() {
            let dataForm = JSON.stringify({email : this.email, password : this.password});
            async function postForm(dataToSend) {
                try {
                    let response = await fetch("http://localhost:3000/api/auth/login", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: dataToSend,
                    });
                        if (response.ok) {
                            let responseId = await response.json();
                            localStorage.setItem("Id", responseId.userId);
                            localStorage.setItem("token", responseId.token);
                             localStorage.setItem("isAdmin", responseId.isAdmin);
                            localStorage.setItem("email", responseId.email);
                            location.replace(location.origin + "/signup#/allpost");
                            
                        } else {
                            console.error('Retour du serveur : ', response.status);
                        }
                } catch (e) {
                    console.log(e);
                }
            }
            postForm(dataForm);
        }
    }
}
</script> 

<style scoped lang="scss">
.md-primary{
    background-color: #024601;
    color:#f0e8c7;
    font-weight: bold;
}
form{
    margin-bottom: 70px;
    margin-top: 50px;
    width:200%;
}
@media all and (max-width: 599px)
{
   form{   
    width:100%;
} 
}
</style>