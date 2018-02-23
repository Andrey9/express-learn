<template>
  <v-toolbar dark color="primary" class="blue darken-2" fixed>
    <v-toolbar-title class="white--text">Express Vue App</v-toolbar-title>
    <router-link :to="{name: 'home'}">
      <v-btn icon>
        <v-icon large>home</v-icon>
      </v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <template v-if="!$store.state.isUserLoggedIn">
      <router-link :to="{name: 'login'}">
        <v-btn flat dark>Sign in</v-btn>
      </router-link>
      <router-link to="register" >
        <v-btn flat dark>Sign up</v-btn>
      </router-link>
    </template>
    <template v-else>
        <v-btn flat dark @click="logout">Log out</v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'page-header',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>

</style>
