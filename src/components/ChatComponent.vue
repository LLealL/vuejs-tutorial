<template>
    <div>
        <h1>Welcome</h1>
        <router-link v-if="!isLoggedIn" to="/signin"><button>Login</button></router-link> 
      </div>
</template>

<script>
export default{

}
</script>