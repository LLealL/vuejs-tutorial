<template>
    <div class="flex flex-col h-full p-6">
        <div class="flex-grow bg-gray-200 p-4 rounded overflow-y-scroll" ref="chatContainer">
            <div class="mb-4" v-for="(message, index) in messages" :key="index">
                <div class="font-bold text-blue-500" v-if="message.sender === 'chatbot'">Chatbot: {{ message.text }}</div>
                <div class="text-green-500" v-if="message.sender === 'user'">Você: {{ message.text }}</div>
            </div>
        </div>
        <div class="mt-4" v-if="questionIndex < questions.length && !isLoading">
            <input v-model="currentAnswer" type="text" class="border rounded w-full p-2" @keyup.enter="submit" placeholder="Digite sua resposta aqui..."/>
        </div>
        <div class="mt-4" v-else-if="isLoading">
            Carregando sugestões...
        </div>
        <div class="mt-4" v-else-if="suggestedNames.length">
            <div class="font-bold">Sugestões de nomes:</div>
            <div class="font-semibold text-purple-500" v-for="(name, index) in suggestedNames" :key="index">
                {{ name }}
            </div>
            <button class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="like">Gostei</button>
            <button class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" @click="dislike">Não gostei</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            questions: [],
            messages: [],
            currentAnswer: '',
            questionIndex: 0,
            isLoading: false,
            suggestedNames: []

        }
    },
    mounted() {
        this.getQuestions();
    },
    computed: {
        messagesJson(){
            return this.messages;
        }
    },
    methods: {
        getQuestions: function(){
            axios.get('http://localhost:3000/ai/questions',{
                headers:{
                    'Authorization': localStorage.getItem('token'),
                },
            }).then(response => {
               // console.log(response.data);
                this.questions = response.data.questions;
                //console.log(this.questions);
                this.askQuestion();
            }).catch(error => {
                console.error(error);
            });
        },
        askQuestion: function() {
            this.messages.push({
                sender: 'chatbot',
                text: this.questions[this.questionIndex]
            });
        },
        submit: function () {
            if (this.currentAnswer.trim() === '') {
                alert('Por favor, responda a pergunta.');
                return;
            }

            this.messages.push({
                sender: 'user',
                text: this.currentAnswer
            });

            this.currentAnswer = '';
            this.questionIndex++;

            if (this.questionIndex < this.questions.length) {
                this.$nextTick(() => {
                    this.askQuestion();
                    this.scrollToEnd();
                });
            } else {
                this.isLoading = true;
                this.getNames();
            }
        },
        scrollToEnd: function() {
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        },
        getNames: function() {

            const payload = {messages: this.messagesJson};
            console.log(payload);
            //
            axios.post('http://localhost:3000/ai/names',payload,{
                headers:{
                    'Authorization': localStorage.getItem('token'),
                },
            }).then(response => {
                console.log(response.data);
                this.suggestedNames = response.data.retorno.names;
                console.log(this.suggestedNames);
                this.messages.push({
                    sender: 'chatbot',
                    text: response.data.retorno.message,
                })
            }).catch(error => {
                console.error(error);
            });
            setTimeout(() => {
                //this.suggestedNames = ['Nome 4', 'Nome 5', 'Nome 6'];
                this.isLoading = false;
            }, 2000);
        },
        like: function() {
            this.messages.push({
                sender: 'chatbot',
                text: 'Obrigado por usar o LealNomes1.0!'
            });

            const payload = { 
                names: this.suggestedNames,
                liked: true}
            axios.post('http://localhost:3000/chat/saveNames',payload,{
                headers:{
                    'Authorization': localStorage.getItem('token'),
                },
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
            });

            //gravar
            this.reset();
        },
        dislike: function() {
            this.isLoading = true;
            this.suggestedNames = [];
            this.getNames();
            //gravar
            console.log(this.suggestedNames);
            const payload = { 
                names: this.suggestedNames,
                liked: false}
            axios.post('http://localhost:3000/chat/saveNames',payload,{
                headers:{
                    'Authorization': localStorage.getItem('token'),
                },
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
            });
        },
        reset: function() {
            this.currentAnswer = '';
            this.questionIndex = 0;
            this.suggestedNames = [];
            this.messages = [];

            this.$nextTick(() => {
                this.getQuestions();
                this.scrollToEnd();
            });
        }
    }
}
</script>

<style scoped>
/* Adicione aqui seu CSS personalizado usando Tailwind */
</style>