<script setup lang="ts">
import type { Message } from '@/interfaces/messages.interface';

export interface Props {
  message: Message;
}

defineProps<Props>();
</script>

<template>
  <div class="message">[{{ message.name }}]: {{ message.text }}</div>
</template>
