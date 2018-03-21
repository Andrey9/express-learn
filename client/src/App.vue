<template>
  <div id="app">
    <v-app>
      <v-container >
        <page-header/>
        <router-view/>
        <flash-messages/>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/partials/PageHeader';
import FlashMessages from './components/partials/FlashMessages';

export default {
  name: 'App',
  components: {
    PageHeader,
    FlashMessages
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app .top-120 {
    margin-top: 120px;
  }
</style>
