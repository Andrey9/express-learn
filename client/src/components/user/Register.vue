<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2 top-120">
        <v-toolbar class="blue darken-2" flat dense dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field name="firstName" label="First Name" id="firstName" type="text"
                        v-model="form.firstName" v-validate="'required'" data-vv-as="first name"
                        :error-messages="errors.collect('firstName')"/>
          <v-text-field name="lastName" label="Last Name" id="lastName" type="text"
                        v-model="form.lastName" v-validate="'required'"
                        :error-messages="errors.collect('lastName')"/>
          <v-text-field name="email" label="Email" id="email" type="email"
                        v-model="form.email" v-validate="'required|email'"
                        :error-messages="errors.collect('email')"/>
          <v-text-field name="password" label="Password" id="password" type="password"
                        v-model="form.password" v-validate="'required|min:6'"
                        :error-messages="errors.collect('password')"/>
          <v-text-field name="password_confirmation" label="Repeat password" id="password_confirmation" type="password"
                        v-model="form.password_confirmation" v-validate="'required|confirmed:password'" data-vv-as="password confirmation"
                        :error-messages="errors.collect('password_confirmation')"/>
        </div>
        <v-btn class="blue darken-2" @click="register" dark>Register</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '../../services/AuthService';
import bus from '../../store/eventBus';

export default {
  name: 'register',
  data () {
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: ''
      }
    };
  },
  created () {
    this.rules = {
      required: (value) => !!value || 'Required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid email';
      },
      min: (length) => {
        return (value) => {
          return value.length >= length || `Should contain at least than ${length} symbols`;
        };
      },
      confirm: (check) => {
        return (value) => {
          return check === value || 'Passwords do not match';
        };
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
    async register () {
      if (!this.isValid) {
        this.validateFields();
        this.$store.dispatch('addMessage', { type: 'error', message: 'Fill required fields' });
        return false;
      }

      try {
        const response = await AuthService.register(this.form);

        this.$store.commit('setToken', response.data.token);
        this.$store.commit('setUser', response.data.user);
        bus.flash('You have registered successfully', 'success');
        this.$router.push('/');
      } catch (error) {
        bus.flash(error.response.data.message, 'error');
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
