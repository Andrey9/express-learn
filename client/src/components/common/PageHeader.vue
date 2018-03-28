<template>
  <div>
    <v-toolbar dark color="primary" class="blue darken-2">
      <v-toolbar-title class="white--text">Express Vue App</v-toolbar-title>
      <v-btn icon  :to="{name: 'home'}">
        <v-icon large>home</v-icon>
      </v-btn>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="!$store.state.isUserLoggedIn">
          <v-btn flat dark to="/login">Sign in</v-btn>
          <v-btn flat dark to="/register">Sign up</v-btn>
        </template>
        <template v-else>
          <v-menu offset-y>
            <v-btn flat dark slot="activator">{{ `${$store.state.user.firstName} ${$store.state.user.lastName}` }}</v-btn>
            <v-list>
              <v-list-tile to="/posts/new">
                <v-list-tile-title>Add new post</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout">
                <v-list-tile-title>Log out</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import bus from '../../store/eventBus';

export default {
  name: 'page-header',
  methods: {
    logout () {
      this.$store.commit('setToken', null);
      this.$store.commit('setUser', null);
      bus.flash('You have logged out', 'success');
      this.$router.push({
        name: 'home'
      });
    }
  }
};
</script>
