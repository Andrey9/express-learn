<template>
  <div class="flash-wrapper">
    <template v-for="(message, key) in $store.state.messages">
      <v-alert :key="key" :type="message.type" :value="true" :dismissible="true" @input="removeMessage(key)">{{ message.message }}</v-alert>
    </template>
  </div>
</template>

<script>
export default {
  name: 'flash-messages',
  methods: {
    removeMessage (messageId) {
      this.$store.commit('removeMessage', messageId);
    }
  }
};
</script>

<style scoped>
  .flash-wrapper {
    position: absolute;
    bottom: 0;
    width: calc(100% - 32px);
    max-width: 868px;
  }
</style>
