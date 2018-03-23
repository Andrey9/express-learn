<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2  top-120">
        <v-toolbar class="blue darken-2" flat dense dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field name="email" label="Email" id="email" type="email"
                        v-model="email" v-validate="'required|email'"
                        :error-messages="errors.collect('email')"/>
          <v-text-field name="password" label="Password" id="password" type="password"
                        v-model="password" v-validate="'required'"
                        :error-messages="errors.collect('password')"/>
        </div>
        <v-btn class="blue darken-2" @click="login" dark>Login</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '../../services/AuthService';
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      email: '',
      password: ''
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
        bus.flash('You have logged in successfully', 'success');
        this.$router.push('/');
      } catch (error) {
        console.log(error);
        bus.flash(error.response.data.message, 'error');
      }
    }
  }
};
</script>
