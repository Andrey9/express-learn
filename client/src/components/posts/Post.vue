<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="card">
        <v-card-title primary-title>
          <h3>{{ post.title }}</h3>
        </v-card-title>
        <v-card-text>
          <div>{{ post.content }}</div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '../../services/PostService';
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      post: {}
    };
  },
  async mounted () {
    try {
      const result = await PostService.getPostById(this.$route.params.id);
      this.post = result.data;
    } catch (err) {
      bus.flash('Whoops! Something went wrong', 'error');
    }
  }
};
</script>

<style scoped>
  .card {
    margin-top: 20px;
    text-align: left;
  }
</style>
