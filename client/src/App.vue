<template>
  <div id="app">
    <v-app>
      <v-container >
        <app-header/>
        <router-view/>
        <app-flash/>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/common/PageHeader';
import FlashMessages from './components/common/FlashMessages';

export default {
  name: 'App',
  components: {
    appHeader: PageHeader,
    appFlash: FlashMessages
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
