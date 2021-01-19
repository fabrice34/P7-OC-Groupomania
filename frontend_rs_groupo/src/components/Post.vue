<template>
<div id="post">
    <h3 class="manager-title font-italic">Le coin de publication...</h3>

    <md-card v-for="(post, id) in posts" v-bind:key="id">
      <md-card-header>        
        <md-list-item>      
          <md-avatar class="md-avatar-icon md-accent">{{ post.user.first_name }} {{ post.user.last_name }}</md-avatar> 
          <span class="md-list-item-text">{{ post.user.first_name }} {{ post.user.last_name }}</span> 
        </md-list-item>   
        <div class="md-title">{{post.title}}</div>   
      </md-card-header>

      <md-card-media>
        <img v-bind:src="post.image_URL" />
      </md-card-media>
    
        
      <md-card-content>
         <div class="md-body">{{post.body}}</div>
          <div class="md-date">créer le :{{post.created_date}}</div> 
      </md-card-content>      
      <md-button type="submit" class="md-primary"  v-on:click="deletePost(post.id)" >Supprimer l'article</md-button>    
    </md-card>    
</div>
</template>


<script>
export default {
    name: 'allPost',
    data () {
        return{
      user:'',
      first_name: '',
      last_name: '',     
             posts: [],          
             title:'',
             body:'',            
            }
        },

      beforeMount(){     
      //Obtenir mon user
      fetch("http://localhost:3000/api/posts/",  {
          method: 'GET',
             headers: {
                 //  'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')   
            }})
    .then (response => response.json())
     .then(data=>this.user = data)
    }
  ,

    mounted(){       
      //Obtenir tous les posts
      fetch("http://localhost:3000/api/posts",  {
          method: 'GET',
             headers: {
                 //  'content-type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('token')
            }})
      .then (response => response.json())
     .then(data=>this.posts = data)
    }, 
    methods: {
           deletePost(id) {
        
            async function postForm() {
    try {
        let response = await fetch("http://localhost:3000/api/posts/" + id, {
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
postForm();
   }
  }}
</script>


<style scoped lang="scss">
.md-primary{
    background-color: #fa0808;
    color:rgb(248, 4, 4);
    font-weight: bold;
    text-align:center;
}
#post{
    margin-bottom: 50px;
    color:rgb(83, 255, 15);
}
.md-card{
     border-bottom: 2px double rgb(10, 1, 1);
     margin-bottom: 100px;
}
.md-title, .md-body {
    color: rgb(36, 35, 35);
    font-weight: bold;
}

.md-date{
    font-size:12px;
}
span {
    color:#000000;
    font-weight: bolder;
}
.md-card-media img {
    width: 70%;
    height: 10%;
    border-radius:8px;
}
</style>