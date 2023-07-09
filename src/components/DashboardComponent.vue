<template>
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
        <input v-if="isEditing" type="text" id="name" v-model="name" class="w-full rounded border border-gray-400 py-2 px-3">
        <p v-else>{{ name }}</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
        <input v-if="isEditing" type="email" id="email" v-model="email" class="w-full rounded border border-gray-400 py-2 px-3">
        <p v-else>{{ email }}</p>
      </div>
      <button v-if="!isEditing" @click="toggleEditMode" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
      <button v-else @click="updateUser" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
      <UserList />
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  import UserList from './UserList.vue';
  export default {
    components: {
    UserList
  },
    data() {
      return {
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        isEditing: false
      };
    },
    methods: {
      toggleEditMode() {
        this.isEditing = true;
      },
      updateUser() {
        // Lógica para atualizar as informações do usuário
        axios.patch('http://localhost:3000/users',{
            email: this.email,
            firstName: this.name
        },{
            headers:{
                'Authorization': localStorage.getItem('token'),
            },
        }).then(response =>{
            console.log(response);
            localStorage.setItem("userEmail", response.data.email);
            localStorage.setItem("userName", response.data.FirstName);
            this.isEditing = false;
        }).catch(error => {
                console.error(error);
        });

      }
    },
  };
  </script>
  
  <style>
  </style>