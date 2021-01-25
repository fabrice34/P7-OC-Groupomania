<template>
  <div>
    <form novalidate class="md-layout" >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
   
              <md-field>
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="first_name"  />   
              </md-field>
           
              <md-field>
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="last_name"  /> 
              </md-field>

          <md-field>
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="email"  />          
          </md-field>
    
          <md-field>
             <label for="password">Password</label>
             <md-input name="password" type="password" id="password" autocomplete="given-password" v-model="password"  />               
          </md-field>
           
        <md-card-actions>
          <md-button type="submit" class="md-primary"  v-on:click.prevent="signUpUser">Create user</md-button>
        </md-card-actions>
      </md-card>    
    </form>
  </div>
</template>

<script>
export default {
    name: 'InscriptionForm',
    data() { return {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        }
    },
       methods:{
        signUpUser(){
            let dataForm = JSON.stringify({first_name: this.first_name, last_name: this.last_name,email: this.email, password: this.password});
            console.log(dataForm)
            async function signUp(dataForm) {
                try {
                let response = await fetch("http://localhost:3000/api/auth/signup", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
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
    background-color: #024601;
    color:#fff;
    font-weight: bold;
}
label{
     color:#fff;
}


.md-layout{
    margin-bottom: 100px;
    margin-top: 50px;
    width: 200%;
}


 @media all and (max-width: 599px)
  {

     .md-layout{
    width:100%; 
    
}
  }

 
</style>