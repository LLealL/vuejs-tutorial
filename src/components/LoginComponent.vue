<template>
    <div v-if="!isLoggedIn">
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
          <input v-model="email" placeholder="email" />
          <br />
          <br />
          <input v-model="password" placeholder="password" type="password" />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
      <div v-else>
        <p>Você está Online e pode acessar o chat.</p>
      </div>
</template>

<script>

export default {
  data: () => {
    return {
      email: "",
      password: "",
      isLoggedIn: false,

    };
  },
  methods: {
    
   async login(e) {
    e.preventDefault();
     const response = await fetch('http://localhost:3000/auth/signin',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      const access_token = await response.json();
      console.log(access_token);
      localStorage.setItem('token', 'Bearer ' + access_token.access_token);
      console.log(localStorage.getItem('token'));
    },
  },
  mounted() {

    const token = localStorage.getItem('token');
    this.isLoggedIn = token !== null;
  }
};
</script>