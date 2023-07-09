<template>
    <div>
      <h3 class="text-xl font-bold mb-4">Lista de Nomes Gerados</h3>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Nomes Curtidos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(name, index) in suggestionList" :key="index">
            <td class="py-2 px-4 border-b">{{ name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        suggestionList: []
      };
    },
    mounted() {
      this.fetchUserList();
    },
    methods: {
      fetchUserList() {
        // Configurar a URL da sua API para obter a lista de usuários
        const url = 'http://localhost:3000/chat/getSuggestions';
  
        // Configurar o cabeçalho da requisição com o token de autorização
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': token
        };
  
        // Enviar a requisição HTTP usando o método GET do axios
        axios.get(url, { headers })
          .then(response => {
            // Atualizar o array userList com a lista de usuários recebida na resposta da API
            this.suggestionList = response.data;
          })
          .catch(error => {
            // Lógica de tratamento de erro da requisição
            console.error('Erro ao obter a lista de usuários:', error);
          });
      }
    }
  };
  </script>
  
<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
</style>