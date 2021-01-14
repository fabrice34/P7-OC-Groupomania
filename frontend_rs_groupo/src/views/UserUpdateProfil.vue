<template>
<div class="headerInscr">
    <h2 class="title2">Update profil</h2>
    <p class="inscrP">ici vous pouvez modifer votre profil !</p>
    <UpdateForm/>
</div>
</template>

<script>
import UpdateForm from '../components/UpdateForm'
export default {
    name: 'UserUpdateForm',
    components: {
    UpdateForm   
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