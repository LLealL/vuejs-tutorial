<template>
  <div id="nav">
    <br>
    <router-link to="/"> 
      Login 
    </router-link> 
    |
    <router-link to="/signup"> 
      Signup 
    </router-link>
    |
    <router-link to="/chat"> 
      Chat
    </router-link>
  </div>
  <div class="container">
    <router-view ></router-view>
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  text-align: center;
}
#nav {
  padding: 30px;
}
</style>