<script setup lang="ts">
import MessageLine from '@/components/message/MessageLine.vue';
import type { Message } from '@/interfaces/messages.interface';

export interface Props {
  messages?: Message[];
}

withDefaults(defineProps<Props>(), {
  messages: () => [],
});
</script>

<template>
  <div class="messages">
    <MessageLine v-for="(message, index) in messages" :message="message" :key="index" />
  </div>
</template>
