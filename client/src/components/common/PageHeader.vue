<template>
  <div>
    <v-toolbar dark color="primary" class="blue darken-2">
      <v-toolbar-title class="white--text">Express Vue App</v-toolbar-title>
      <router-link :to="{name: 'home'}">
        <v-btn icon>
          <v-icon large>home</v-icon>
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="!$store.state.isUserLoggedIn">
          <v-btn flat dark @click="linkTo('/login')">Sign in</v-btn>
          <v-btn flat dark @click="linkTo('/register')">Sign up</v-btn>
        </template>
        <template v-else>
          <v-btn flat dark @click="logout">Log out</v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  methods: {
    linkTo (link) {
      this.$router.push(link);
    },
    logout () {
      this.$store.commit('setToken', null);
      this.$store.commit('setUser', null);
      this.$router.push({
        name: 'home'
      });
    }
  }
};
</script>

<style scoped>

</style>
