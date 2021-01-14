<template>
<div class="headerInscrr">
    <h2 class="title2">Profil</h2>
    <p class="inscrP">Ici, vous pouvez voir votre profil utilisateur ...</p>
    <MyProfilForm/>
</div>
</template>

<script>
import MyProfilForm from '../components/MyProfilForm'
export default {
    name: 'MyProfil',
    components: {
    MyProfilForm
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