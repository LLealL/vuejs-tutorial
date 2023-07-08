<template>
  <div v-if="isLoggedIn">
    <div class="chat-area">
      <div v-for="message in messages" :key="message.id">
        <strong>{{ message.user }}:</strong> {{ message.text }}
      </div>
    </div>
    <div class="input-area">
      <input type="text" v-model="newMessage" @keydown.enter="sendMessage" placeholder="Digite sua mensagem..." :disabled="!isWaitingForResponse" />
      <button @click="sendMessage" :disabled="!isWaitingForResponse">Enviar</button>
    </div>
    <ChatButton v-if="isAllQuestionsAnswered" :userResponses="userResponses" />
  </div>
  <div v-else>
    <p>Você precisa fazer login para acessar o chat.</p>
  </div>
</template>

<script>
import ChatButton from './ChatButton.vue';
export default {
  components: {
    ChatButton
  },
  data() {
    return {
      messages: [],
      newMessage: "",
      questions: [
        "Qual é o seu nome?",
        "Qual é a sua idade?",
        "Qual é o seu país de origem?",
        "Qual é o seu país de origem da familia?",
      ],
      currentQuestionIndex: 0,
      isWaitingForResponse: false,
      userResponses: {},
      isLoggedIn: false,
    };
  },
  computed: {
    isAllQuestionsAnswered() {
      return this.currentQuestionIndex > this.questions.length;
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const message = {
          id: Date.now(),
          user: "Você",
          text: this.newMessage
        };
        
        this.messages.push(message);
        
        if (this.currentQuestionIndex < this.questions.length ) {
          const currentQuestion = this.questions[this.currentQuestionIndex];
          this.userResponses[currentQuestion] = this.newMessage;
          
          this.newMessage = "";
          this.sendQuestion();
        } else {
          this.userResponses[this.questions[this.currentQuestionIndex]] = this.newMessage;
          
          // Limpar o campo de entrada de texto e desabilitá-lo
          this.newMessage = "";
          this.isWaitingForResponse = false;
          
          // Exibir a última pergunta antes de enviar todas as respostas
          this.sendQuestion();
          
          // Aqui você pode fazer a requisição HTTP com as respostas do usuário
          this.sendUserResponses();
        }
      }
    },
    sendQuestion() {
      const question = this.questions[this.currentQuestionIndex];
      const message = {
        id: Date.now(),
        user: "Chatbot",
        text: question
      };
      
      this.messages.push(message);
      this.currentQuestionIndex++;
      this.isWaitingForResponse = true;
    },
    sendUserResponses() {
      this.isWaitingForResponse = false;
    }
  },
  mounted() {
    this.sendQuestion();
    const token = localStorage.getItem('token');
    this.isLoggedIn = token !== null;
  }
};
</script>

<style scoped>
.chat-area {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.input-area {
  display: flex;
  align-items: center;
}

.input-area input[type="text"] {
  flex: 1;
  padding: 5px;
  margin-right: 5px;
}

.input-area button {
  padding: 5px 10px;
}
</style>