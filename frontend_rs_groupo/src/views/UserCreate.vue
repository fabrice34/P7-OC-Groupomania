<template>
<div class="headerInscr">
    <h2 class="title2">Créer un nouvel article</h2>
    <p class="inscrP">Ici, vous pouvez écrire ou partager le lien d'un article qui vous intéresse...</p>
    <CreatePostForm/>
</div>
</template>

<script>
import CreatePostForm from '../components/CreatePostForm'
export default {
    name: 'UserCreate',
    components: {
    CreatePostForm
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
</style>
