<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2  top-120">
        <v-toolbar class="blue darken-2" flat dense dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field name="email" label="Email" id="email" type="email"
                        v-model="email" :rules="[rules.required, rules.email]"/>
          <v-text-field name="password" label="Password" id="password" type="password"
                        v-model="password" :rules="[rules.required]" />
        </div>
        <v-btn class="blue darken-2" @click="login" dark>Login</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '../../services/AuthService';
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  created () {
    this.rules = {
      required: (value) => !!value || 'Required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid email';
      }
    };
  },
  computed: {
    isValid () {
      return !this.$children.some(item => {
        return item.valid !== undefined && item.valid === false;
      });
    }
  },
  methods: {
    async login () {
      if (!this.isValid) {
        this.validateFields();
        this.$store.dispatch('addMessage', { type: 'error', message: 'Fill required fields' });
        return false;
      }

      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        });

        this.$store.commit('setToken', response.data.token);
        this.$store.commit('setUser', response.data.user);
        this.$store.dispatch('addMessage', { type: 'success', message: 'You have logged in successfully' });
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        this.$store.dispatch('addMessage', { type: 'error', message: error.response.data.message });
      }
    },
    validateFields () {
      this.$children.forEach(item => {
        item.shouldValidate = true;
      });
    }
  }
};
</script>
