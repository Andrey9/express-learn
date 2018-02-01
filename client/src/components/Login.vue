<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar class="blue darken-2" flat dense dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            name="email"
            label="Email"
            id="email"
            type="email"
            v-model="email"
            @input="clearError"
          ></v-text-field>
          <v-text-field
            name="password"
            label="Password"
            id="password"
            type="password"
            v-model="password"
            @input="clearError"
          ></v-text-field>
        </div>
        <div class="error" v-if="error">{{error}}</div>
        <br>
        <v-btn class="blue darken-2" @click="login" dark>Login</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    clearError () {
      this.error = null
    }
  }
}
</script>

<style scoped>
  .error {
    color: #fff;
  }
</style>
