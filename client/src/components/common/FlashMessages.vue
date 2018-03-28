<template>
  <div>
    <v-snackbar :timeout="5000" :color="status" v-model="display">
      {{ message }}
      <v-btn flat dark @click.native="display = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      status: 'info',
      message: '',
      display: false
    };
  },
  created () {
    bus.$on('flash', this.showMessage);
  },
  methods: {
    showMessage (message, status) {
      this.display = false;
      this.message = message;
      this.status = status;
      this.display = true;
    }
  }
};
</script>
