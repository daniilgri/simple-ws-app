<script setup lang="ts">
import debounce from 'lodash/debounce';
import { io } from 'socket.io-client';
import { ref, onBeforeMount } from 'vue';

import type { Message } from '@/interfaces/messages.interface';
import MessagesList from './components/messages-list/MessagesList.vue';

const messageText = ref<string>('');
const messages = ref<Message[]>([]);
const isJoined = ref<boolean>(false);
const name = ref<string>('');
const typingDisplay = ref<string>('');

const socket = io('http://127.0.0.1:3001');

onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (payload: Message[]) => {
    messages.value = payload;
  });

  socket.on('message', (payload: Message) => {
    messages.value.push(payload);
  });

  socket.on('typing', (payload: { clientName: string; isTyping: boolean }) => {
    if (payload.isTyping) {
      typingDisplay.value = `${payload.clientName} is typing...`;
    } else {
      typingDisplay.value = '';
    }
  });
});

function join(): void {
  socket.emit('join', { name: name.value }, () => {
    isJoined.value = true;
  });
}

function sendMessage(): void {
  socket.emit('createMessage', { text: messageText.value }, () => {
    messageText.value = '';
  });
}

const emitTyping = (): void => {
  socket.emit('typing', { isTyping: true });
  debounce(() => {
    socket.emit('typing', { isTyping: false });
  }, 600)();
};
</script>

<template>
  <div class="app">
    <form v-if="!isJoined" @submit.prevent="join">
      <label for="login-user-name-input">What's your name?</label>
      <input v-model="name" id="login-user-name-input" type="text" />
      <button type="submit">Join</button>
    </form>
    <div v-else>
      <MessagesList :messages="messages" />
      <div v-if="typingDisplay">{{ typingDisplay }}</div>
      <hr />
      <form @submit.prevent="sendMessage">
        <label for="message-text-input"></label>
        <input v-model="messageText" id="message-text-input" @input="emitTyping" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import './assets/base.css';
</style>
