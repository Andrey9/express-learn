import Vue from 'vue';

export default new Vue({
  methods: {
    flash (message, status = 'info') {
      this.$emit('flash', message, status);
    }
  }
});
