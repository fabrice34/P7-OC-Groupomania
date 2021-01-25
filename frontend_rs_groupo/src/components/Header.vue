<template>
<div class="headerTitle">
    <div class="form">
        <h1 class="main-title">Forum groupomania</h1>
    </div>
    <div>
        <img class="logo-title" src='../assets/icon-left-font-monochrome-black.png' alt="Icon de Groupomania">
    </div>   
</div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.headerTitle{
    background-color: #004BCC;
}
.main-title{
    font-size: 1.5rem;
    color: #CCCCCC;
    font-weight: bolder;
    font-family: Georgia, 'Times New Roman', Times, serif ;
}
.logo-title{
    width: 12rem;
}
.headerTitle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-left: 5px;
    padding-right: 5px;
}
  @media all and (max-width: 899px)
  {
      .headerTitle{
          display: flex;
          flex-direction: column;
      }
  }
</style>