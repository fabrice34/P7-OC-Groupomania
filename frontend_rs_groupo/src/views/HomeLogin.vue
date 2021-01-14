<template>
<div class="headerInscr">
    <h2 class="title2">Connexion</h2>
    <p class="inscrP">Connectez-vous pour accéder au forum !</p>
    <ConnexionForm/>
</div>
</template>

<script>
import ConnexionForm from '../components/ConnexionForm'
export default {
  name: 'HomeSignup',
  components: {
  ConnexionForm
    }
}
</script>

<style scoped>
.headerInscr{
display: flex;
flex-direction: column;
align-items: center;
}

.title2{
    text-align: center;
    color: rgb(252, 5, 5);
    box-shadow: 10px 5px 5px red;
}

.inscrP{
    text-align: center;
    font-style: italic;
}

 @media all and (max-width: 599px)
 {
  .headerInscr{
      margin-bottom:50px;
  }   
 }
</style>