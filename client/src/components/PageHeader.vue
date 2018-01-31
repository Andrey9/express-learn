<template>
  <v-toolbar dark color="primary" class="blue darken-2" fixed>
    <v-toolbar-title class="white--text">Express Vue App</v-toolbar-title>
    <router-link :to="{name: 'helloworld'}">
      <v-btn icon>
        <v-icon large>home</v-icon>
      </v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <router-link :to="{name: 'login'}">
      <v-btn flat dark>Sign in</v-btn>
    </router-link>
    <router-link to="register">
      <v-btn flat dark>Sign up</v-btn>
    </router-link>
  </v-toolbar>
</template>

<script>
export default {
  name: 'page-header'
}
</script>

<style scoped>

</style>
