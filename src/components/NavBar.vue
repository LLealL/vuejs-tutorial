<template>
    <div id="nav" class="bg-gray-200 py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-blue-600 hover:text-blue-800">Login</router-link>
          <span class="text-gray-700 mx-2">|</span>
          <router-link to="/signup" class="text-xl font-bold text-blue-600 hover:text-blue-800">Signup</router-link>
          <span class="text-gray-700 mx-2">|</span>
          <router-link to="/chat" class="text-xl font-bold text-blue-600 hover:text-blue-800">Chat</router-link>
        </div>
        <div>
          <!-- Coloque aqui qualquer conteúdo adicional do lado direito do navbar, se necessário -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  };
  </script>
  
  <style>
  </style>