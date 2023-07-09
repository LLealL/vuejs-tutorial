<template>
  <div class="bg-gray-200 flex justify-center items-center">
    <div class="container">
      <h2 class="text-2xl font-bold mb-4 text-center">Signup</h2>
      <form @submit.prevent="signup" class="max-w-xs mx-auto">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
          <input type="email" id="email" v-model="email" required class="w-full rounded border border-gray-400 py-2 px-3">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Password:</label>
          <input type="password" id="password" v-model="password" required class="w-full rounded border border-gray-400 py-2 px-3">
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required class="w-full rounded border border-gray-400 py-2 px-3">
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async signup() {
      if (this.validateForm()) {

        // Realizar a chamada HTTP usando o Axios
        axios.post('http://localhost:3000/auth/signup', {
          email: this.email,
          password: this.password
        }).then(response => {
          const access_token = response.json();
          console.log(access_token);
          localStorage.setItem('token', 'Bearer ' + access_token.access_token);
        }).catch(error => {
              console.error(error);
        });

        // Resetar os campos do formulário após o envio
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

      }
    },
    validateForm() {
      if (!this.email || !this.password || !this.confirmPassword) {
        alert('Por favor, preencha todos os campos');
        return false;
      }

      if (this.password !== this.confirmPassword) {
        alert('As senhas não correspondem');
        return false;
      }

      return true;
    }
  }
};
</script>

<style>
.container {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>