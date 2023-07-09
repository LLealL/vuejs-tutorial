<template>
  <div class="container">
    <div v-if="!isLoggedIn" class="bg-gray-200 flex justify-center items-center">
      <div class="w-auto">
        <h1 class="text-2xl font-bold mb-4">LOGIN</h1>
        <form @submit.prevent="login" class="flex flex-col">
          <div class="mb-4">
            <input v-model="email" placeholder="Email" class="rounded border border-gray-400 py-2 px-3 mb-4" />
          </div>
          <div class="mb-4">
            <input v-model="password" placeholder="Password" type="password" class="rounded border border-gray-400 py-2 px-3 mb-4" />
          </div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-20 mx-auto">Login</button>
        </form>
      </div>
    </div>
    <div v-else>
      <DashboardComponent />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DashboardComponent from './DashboardComponent.vue';

export default {
  components: { DashboardComponent },
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
            axios.post("http://localhost:3000/auth/signin", {
                email: this.email,
                password: this.password
            }).then(response => {
                const access_token = response.data.access_token;
                localStorage.setItem("token", "Bearer " + access_token);
                this.isLogged(); // Verifica se o usuário está logado após o login
            }).catch(error => {
                console.error(error);
            });
        },
        async isLogged() {
            await axios.get("http://localhost:3000/users/me", {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                },
            }).then(response => {
                console.log(response);
                this.isLoggedIn = true; // O usuário está logado
                localStorage.setItem("userEmail", response.data.email);
                localStorage.setItem("userName", response.data.firstName);

            }).catch(error => {
                console.error(error);
                if (error.response.status === 401) {
                    this.logout();
                }
            });
        },
        logout() {
            localStorage.removeItem("token");
            this.isLoggedIn = false;
        },
        async checkLoginStatus() {
            // Verifica o status de login
            await this.isLogged();
        },
    },
    mounted() {
        this.checkLoginStatus(); // Executa a verificação de status de login quando o componente é montado
        setInterval(this.checkLoginStatus, 60000); // Executa a verificação a cada 60 segundos (ajuste o intervalo conforme necessário)
    },
};
</script>

<style>
.container {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>