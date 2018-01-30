<template>
  <div>
    <h1>Register</h1>

    <input type="email" name="email" placeholder="Email" v-model="email">
    <br>
    <input type="password" name="password" placeholder="Password" v-model="password">
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      await AuthService.register({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
