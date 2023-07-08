<template>
    <button @click="sendUserResponses" :disabled="isSending">Enviar Respostas</button>
  </template>
  
  <script>

  
  export default {
    props: {
      userResponses: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isSending: false
      };
    },
    methods: {
      sendUserResponses() {
        this.isSending = true;
        
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    padding: 5px 10px;
  }
  </style>